'use strict'

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User');
const Role = use('App/Models/Role');


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
    .with('roles')
    .where('id', id).fetch();
    return user;
  }

  async login ({ auth, request }) {
   
    const { username, password } = request.all();
    const token = await auth.attempt(username,password);
    return token;
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
}

module.exports = UserController
