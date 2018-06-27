'use strict'

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User');


class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index ({ request }) {
    const users =  await User.all()

    for(var prop in users.rows){
      users.rows[prop].roles = await users.rows[prop].roles().fetch();
    }
    
    return users;
  }

  async login ({ request }) {
    const { username, password } = request.all();
    
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   */
  async create ({auth, request }) {
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
   * Create/save a new user.
   * POST users
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
