'use strict'

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new role.
   * GET roles/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new role.
   * POST roles
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single role.
   * GET roles/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing role.
   * GET roles/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update role details.
   * PUT or PATCH roles/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a role with id.
   * DELETE roles/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RoleController
