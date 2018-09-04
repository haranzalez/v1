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
    const role = await Role.query().with('modulos.subModulo.permisos').where('id', id).fetch();
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
      message: 'Destroyed!',
      role
    };
  }


  async setPermisos({ params, request }) {
    const { role_id, sub_modulo_id } = params;
    const { editar, crear, eliminar } = request.all();
    const payload = {
      role_id: role_id,
      sub_modulo_id: sub_modulo_id,
      editar: editar,
      crear: crear,
      eliminar: eliminar,
    }

    const role = await Permisos.query().where('role_id', role_id).where('sub_modulo_id', sub_modulo_id).fetch()    
    if(role.rows.length == 0){
      await Permisos.query().insert(payload)
    }
    await Permisos.query()
    .where('role_id', role_id)
    .where('sub_modulo_id', sub_modulo_id)
    .update(payload)

    return await Role.query().with('permisos', (builder) => {
      builder.where('role_id', role_id)
    }).where('id', role_id).fetch();
    
  }
}

module.exports = RoleController
