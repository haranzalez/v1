'use strict'

const Role = use('App/Models/Role')
const Permisos = use('App/Models/RoleModuloPermiso')
const Database = use('Database')

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   */
  async index ({ request, response, view }) {
    const roles = await Role.all()
    return roles;
  }

  async fetchOne ({ params }) {
    const { id } = params;
    const role = await Role.query().with('modulos.permisos', (builder) => {
      builder.where('role_id', id)
    }).where('id', id).fetch();
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
      role.modulos = role.modulos().fetch();
    }
   
    return role;
  }


  /**
   * Update role details.
   * PUT or PATCH roles/:id
   */
  async update ({ params, request }) {
    const { id } = params;
    const { modulos, permisos } = request.all();
    const role = await Role.find(id);
    const old = await Role.find(id);
    old.users = await old.users().fetch()
    
    if(modulos && modulos.length > 0){
      await role.modulos().attach(modulos)
      role.modulos = await role.modulos().fetch()
    }

    role.merge(request.only(['nombre', 'description']))
    role.save();
    role.users = await role.users().fetch()
    return {
      message: 'Updated!',
      old: old,
      new: role
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
    const { role_id, modulo_id } = params;
    const { editar, crear, eliminar } = request.all();
    const payload = {
      role_id: role_id,
      modulo_id: modulo_id,
      editar: editar,
      crear: crear,
      eliminar: eliminar,
    }

    const role = await Permisos.query().where('role_id', role_id).where('modulo_id', modulo_id).fetch()    
    if(role.rows.length == 0){
      await Permisos.query().insert(payload)
    }
    await Permisos.query()
    .where('role_id', role_id)
    .where('modulo_id', modulo_id)
    .update(payload)

    return await Role.query().with('modulos.permisos', (builder) => {
      builder.where('role_id', role_id)
    }).where('id', role_id).fetch();
    
  }
}

module.exports = RoleController
