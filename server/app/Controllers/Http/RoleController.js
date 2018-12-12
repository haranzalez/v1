'use strict'

const Role = use('App/Models/Role')
const Modulo = use('App/Models/Modulo')
const Permisos = use('App/Models/RoleSubModuloPermiso')
const Database = use('Database')

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   */
  async index () {
    const roles = await Role.all()
    return roles;
  }

  async fetchAllModules(){
    return Modulo.query().with('subModulo').fetch();
  }

  async fetchOne ({ params }) {
    const { id } = params;
    const role = await Role.find(id);
    return role;
  }

  /**
   * Render a form to be used for creating a new role.
   * GET roles/create
   */
  async create ({ request }) {
    const { nombre, description, modulos } = request.all();
    const role = await Role.create({
      nombre, 
      description
    }) 
    if(modulos && modulos.length > 0){
      await role.modulos().attach(modulos);
      role.modulos = await role.modulos().fetch();
    }
    return role;
  }


  /**
   * Update role details.
   * PUT or PATCH roles/:id
   */
  async update ({ params, request }) {
    const { id } = params;
    const { modulos, nombre, description } = request.all();
    const allMods =  await Modulo.all()
    const role = await Role.find(id);
    
    if(modulos && modulos.length > 0){
      for(let prop in allMods.rows){
        if(modulos.indexOf(allMods.rows[prop]['id']) === -1){
          await role.modulos().detach(allMods.rows[prop]['id'])
        }else{
          await role.modulos().attach(modulos)
        }
      }
    }else{
      for(let prop in allMods.rows){
        await role.modulos().detach(allMods.rows[prop]['id'])
      }
    }
    
    role.nombre = nombre
    role.description = description
    await role.save();
    role.modulos = await role.modulos().fetch()
    return {
      message: 'Updated!',
      role,
    }
  }

  /**
   * Delete a role with id.
   * DELETE roles/:id
   */
  async destroy ({ params }) {
    const { id } = params;
    const role = await Role.find(id)
    role.delete();
    return {
      message: 'success'
    };
  }


  async setPermisos({ params, request }) {
    console.log(request.all())
    const { role_id, sub_modulo_id } = params;
    const { op, value } = request.all();
    const role = await Role.find(role_id)
    const permisos = await role.permisos().where('sub_modulo_id', sub_modulo_id).fetch()
    if(permisos.rows.length <= 0){
      await Permisos.create({
        role_id,
        sub_modulo_id,
        [op]: value
      })
    }else{
      const permisosTable = await Permisos.find(permisos.rows[0].id)
      permisosTable[op] = value
      permisosTable.save()
      console.log(permisosTable[op])
    }
    
    return {
      message: 'success'
    }
    
  }
  async setPermisosV2({ params, request }) {
    var { role_id, sub_modulo_id } = params;
    const { pkg } = request.all();
    role_id = Number(role_id)
    sub_modulo_id = Number(sub_modulo_id)
    const role = await Role.find(role_id)
    const permisos = await role.permisos().where('sub_modulo_id', sub_modulo_id).fetch()
    var readyPkg = {}
    var list = ['eliminar', 'crear', 'editar']
    var off = list.filter(x => !pkg.includes(x));
    pkg.forEach((item) => {
      readyPkg[item] = true
    }) 
    off.forEach((item) => {
      readyPkg[item] = false
    })
    if(permisos.rows.length <= 0){
      readyPkg['role_id'] = role_id
      readyPkg['sub_modulo_id'] = sub_modulo_id
      await Permisos.create(readyPkg)
    }else{
      const permisosTable = await Permisos.find(permisos.rows[0].id)
      permisosTable.merge(readyPkg)
      await permisosTable.save()
    }
    
    return {
      message: 'success'
    }
    
  }

  async fetchPermisos({params}){
    const { id } = params
    var role = await Role.find(id)
    
    role = await role.modulos().with('subModulo.permisos').fetch()
    console.log(role)
    for(let prop in role.rows){
      for(let prop2 in role.rows[prop].$relations.subModulo.rows){
        if(role.rows[prop].$relations.subModulo.rows[prop2].$relations.permisos.rows[0] != null){
          role.rows[prop].$relations.subModulo.rows[prop2].$relations.permisos = {
            subId: role.rows[prop].$relations.subModulo.rows[prop2].id,
            editar:role.rows[prop].$relations.subModulo.rows[prop2].$relations.permisos.rows[0]['editar'],
            crear:role.rows[prop].$relations.subModulo.rows[prop2].$relations.permisos.rows[0]['crear'],
            eliminar:role.rows[prop].$relations.subModulo.rows[prop2].$relations.permisos.rows[0]['eliminar'],
          }
        }
      }
    }
    return role
  }

  async fetchPermisosv2({params}){
    const { roleid, subid } = params
    const permi = await Permisos.query().where({
      role_id: roleid,
      sub_modulo_id: subid
    }).fetch()
    console.log(permi.rows)
    if(permi.rows.length > 0){
      return {
        editar:permi.rows[0]['editar'],
        crear:permi.rows[0]['crear'],
        eliminar:permi.rows[0]['eliminar']
      }
    }
    return {
      editar:false,
      crear:false,
      eliminar:false
    }
    
  }
}

module.exports = RoleController
