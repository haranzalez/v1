'use strict'

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User');
const EmailService = use('App/Services/EmailService');
const Encryption = require('crypto');
const PasswordRequest = use('App/Models/PasswordRequest')


class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index ({ auth, request }) {
    return await User.all();
  }

  async fetchOne ({ params }) {
    const { id } = params;
    const user = await User.query()
    .with('roles.modulos.permisos')
    .where('id', id).fetch();
    return user;
  }

  async login ({ auth, request }) {
   
    const { username, password } = request.all();
    const token = await auth.attempt(username,password);
    const user = await User.query()
    .with('roles.modulos.permisos')
    .where('username', username).fetch();
    return {
      user,
      token,
    }
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   */
  async create ({ request }) {
    
    const { nombre, apellido, username, email, password, roles } = request.all();
    const user = await User.create({
      nombre,
      apellido,
      username,
      email,
      password
    }) 

    if(roles && roles.length > 0){
      await user.roles().attach(roles)
      user.roles = await user.roles().fetch()
    }

    return user;

  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update ({ params, request }) {
    const { id } = params;
    const { roles } = request.all();
    const user = await User.find(id);
    const old = await User.find(id);
    old.roles = await old.roles().fetch()

    if(roles && roles.length > 0){
      await user.roles().attach(roles)
      user.roles = await user.roles().fetch()
    }
    user.merge(request.only(['nombre', 'apellido', 'username', 'email', 'password']))
    user.save();
    return {
      message: 'Updated!',
      old: old,
      new: user
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
      
      e.sendPasswordResetEmail({
        from: 'haranzalez@gmail.com',
        to: email,
        subject: 'Cambio de clave',
        text: 'Esta recibiendo este email porque usted (o alguien) solicito '+
        'cambiar el password de su cuenta.\n\n'+
        'Porfavor haga click en el siguiente link para completar el proceso de cambio:\n\n'+
        'http://localhost:3333/api/password/reset/' + token + '\n\n'+
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

  async confirmPasswordChange({ params, response }){
    const { token } = params;
    const requests = await PasswordRequest.query().where({ token: token }).fetch()
    const now = Date.now();
    
      if(requests.rows.length > 0 && requests.rows[0].expires >= now){
        response.redirect('http://localhost:8080/reset-password/'+token)
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
        console.log(user.email)
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
  



}

module.exports = UserController
