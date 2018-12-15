'use strict'

/**
 * Resourceful controller for interacting with users
 */
const Env = use('Env');
const User = use('App/Models/User');
const EmailService = use('App/Services/EmailService');
const Encryption = require('crypto');
const PasswordRequest = use('App/Models/PasswordRequest')
const UserLogService = use('App/Services/UsersLogService');
const Logs = use('App/Models/UserLog')
const Database = use('Database')


class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index ({ auth, request }) {
    return await User.query()
    .with('roles.modulos.subModulo.permisos')
    .fetch();
  }

  async fetchOne ({ params }) {
    const { id } = params;
    const user = await User.query()
    .with('roles.modulos.subModulo.permisos')
    .where('id', id).fetch();
    return user;
  }

  async login ({ auth, request }) {
    var log = new UserLogService()
    const { username, password } = request.all();
    
    const token = await auth.attempt(username,password);
    var user = await User.query().where('username', username).fetch()
    var res = await User.find(user.rows[0].id)
    res = await res.roles().fetch()
    console.log(res.rows[0].id)
    user = await User.query()
    .where('username', username).with('roles.modulos.subModulo.permisos', (builder) => {
      builder.where('role_id', res.rows[0].id)
      
    }).fetch();
    const userId = user.rows[0].id
    await log.login(request.ip(),token.token, userId)
    return {
      user,
      token,
    }
    
  }


  async logout({request}){
    var log = new UserLogService()
    return log.logout(request)
  }

  async userLogs({request}){
    return await User.query().with('logs').fetch()
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   */
  async create ({ request }) {
    const { roles,
      nombre,
      apellido,
      cedula,
      tel_fijo,
      tel_mobil,
      direccion,
      ciudad,
      departamento,
      username,
      email,
      password } = request.all();
   
    const user = await User.create({
      nombre,
      apellido,
      cedula,
      tel_fijo,
      tel_mobil,
      direccion,
      ciudad,
      departamento,
      username,
      email,
      password,
    }) 

    if(roles.length > 0){
      await user.roles().attach(roles)
    }

    this.sendPassword(request.only(['email']))
    return {
      message: 'success'
    };
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update ({ params, request }) {
    const { id } = params;
    const { roles,
      nombre, 
      apellido,
      cedula, 
      tel_fijo,
      tel_mobil,
      direccion,
      ciudad,
      departamento,
      username, 
      estado, } = request.all();
    const user = await User.find(id);
    console.log(roles)
    if(roles){
      const oldRoles = await user.roles().fetch()
      if(oldRoles.rows.length > 0){
        for(var prop in oldRoles.rows){
          await user.roles().detach(oldRoles.rows[prop].id)
        }
      }
      await user.roles().attach(roles)
    }
    await Database
    .table('users')
    .where('id', id)
    .update({
      nombre, 
      apellido,
      cedula, 
      tel_fijo,
      tel_mobil,
      direccion,
      ciudad,
      departamento,
      username, 
      estado,
    })

    return {
      message: 'success'
    }

  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy ({ params }) {
    const { id } = params;
    const user = await User.find(id)
    user.delete();
    return {
      message: 'Destroyed!',
      user
    };
  }
  async sendPasswordChangeEmail({ request }) {
    const { email, ip } = request.all();
    const user = await User.query().where('email', email).fetch();
    
    if(user.rows.length > 0){

      const e = new EmailService()
      const token = Encryption.randomBytes(20).toString('hex')
      const iplink = '172.30.10.18';
      const port = '3333';
      e.sendPasswordResetEmail({
        from: 'haranzalez@gmail.com',
        to: email,
        subject: 'Cambio de clave',
        text: 'Esta recibiendo este email porque usted (o alguien) solicito '+
        'cambiar el password de su cuenta.\n\n'+
        'Porfavor haga click en el siguiente link para completar el proceso de cambio:\n\n'+
        'http://'+iplink+':'+port+'/api/password/reset/' + token + '\n\n'+
        'Si usted no ha solicitado cambiar su password, porfavor ignore este email y su password no cambiara.',
        user_id: user.rows[0].id,
        ip: ip,
        token: token,
        expires: Date.now() + 3600000,
      })
        
      return {
        type: 'success',
        message: 'Un email se a enviado a su correo electronico. Porfavor revice su correo y siga las indicaciones.',
        payload: email,
      }

    }else{
      return {
        type: 'warning',
        message: 'El email no se encuentra registrado en la base de datos.',
        payload: email,
      }
    }
  }
  async sendPassword(email) {
    const user = await User.query().where('email', email).fetch();
    
    if(user.rows.length > 0){

      const e = new EmailService()
      const token = Encryption.randomBytes(20).toString('hex')
      const iplink = '172.30.10.18';
      const port = '3333';
      e.sendPasswordResetEmail({
        from: 'haranzalez@gmail.com',
        to: email,
        subject: 'Cambio de clave',
        text: 'Esta recibiendo este email porque usted (o alguien) solicito '+
        'assignar o cambiar el password de su cuenta.\n\n'+
        'Porfavor haga click en el siguiente link para completar el proceso de cambio:\n\n'+
        'http://'+iplink+':'+port+'/api/password/reset/' + token + '\n\n'+
        'Si usted o el administrador no ha solicitado cambiar su password, porfavor ignore este email y su password no cambiara.',
        user_id: user.rows[0].id,
        ip: ip,
        token: token,
        expires: Date.now() + 3600000,
      })
        
      return {
        type: 'success',
        message: 'Un email se a enviado al correo electronico: '+user.rows[0].email,
        payload: email,
      }

    }else{
      return {
        type: 'warning',
        message: 'El email no se encuentra registrado en la base de datos.',
        payload: email,
      }
    }
  }


  async confirmPasswordChange({ params, response }){
    const { token } = params;
    const requests = await PasswordRequest.query().where({ token: token }).fetch()
    const now = Date.now();
    
      if(requests.rows.length > 0 && requests.rows[0].expires >= now){
        response.redirect('http://172.30.10.17:8080/reset-password/'+token)
      }else {
        return{
          message: 'Solicitud expirada'
        }
      }
    }
    async resetPassword({ request }){
      const { token, password } = request.all();
      const preq = await PasswordRequest.query().where({ token: token }).fetch()
      if(preq.rows.length > 0){
        const id = preq.rows[0].user_id
        const user = await User.find(id);
        user.merge({password: password})
        user.save();
        preq.rows[0].merge({token: null})
       
        preq.rows[0].save();
        const em = new EmailService()
        em.sendPasswordResetConfirmationEmail({
          from: 'haranzalez@gmail.com',
          to: user.email,
          subject: 'Clave actualizada exitosamente!',
          text: 'Este email es para confirmar su cambio de clave.',
        })
        return {
          type: 'success',
          message: 'Su clave fue actualizada.'
        }
      }else{
        return {
          type: 'warning',
          message: 'Solicitud de cambio de contraseña expirado. Porfavor realize una nueva solicitud.'
        }
      }
     
     
     
    }

    async changeState({ params, request }){
      const { id } = params
      const { estado } = request.all()

      await Database
      .table('users')
      .where('id', id)
      .update('estado', estado)
      return {
        message: 'success'
      }
    }
  



}

module.exports = UserController
