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
    }
    return roles;
  }

  /**
   * Render a form to be used for creating a new role.
   * GET roles/create
   */
  async create ({ request, response, view }) {
    
    const { role, description } = request.all();
    return await Role.create({
      role, 
      description
    }) 
  }


  /**
   * Update role details.
   * PUT or PATCH roles/:id
   */
  async update ({ params, request }) {
    const { id } = params;
   
    const role = await Role.find(id);
    const old = await Role.find(id);
    old.users = await old.users().fetch()
    

    role.merge(request.only(['role', 'description']))
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
