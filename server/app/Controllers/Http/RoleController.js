'use strict'

const Role = use('App/Models/Role')

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   */
  async index ({ request, response, view }) {
    const roles = await Role.all();
    for(var prop in roles.rows){
      roles.rows[prop].users = await roles.rows[prop].users().fetch();
      roles.rows[prop].modulos = await roles.rows[prop].modulos().fetch();
    }
    return roles;
  }

  /**
   * Render a form to be used for creating a new role.
   * GET roles/create
   */
  async create ({ request }) {
    
    const { nombre, description, modulos, permisos } = request.all();
    const role = await Role.create({
      nombre, 
      description
    }) 

    if(modulos && modulos.length > 0){
      await role.modulos().attach(modulos)
      role.modulos = await role.modulos().fetch()
    }
    if(permisos && permisos.length > 0){
      await role.permisos().attach(permisos)
      role.permisos = await role.permisos().fetch()
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
    if(permisos && permisos.length > 0){
      await role.permisos().attach(permisos)
      role.permisos = await role.permisos().fetch()
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
}

module.exports = RoleController
