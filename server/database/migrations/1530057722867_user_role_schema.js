'use strict'

const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up () {
    this.create('user_roles', (table) => {
      table.integer('user_id').unsigned().index('user_id')
      table.integer('role_id').unsigned().index('role_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.foreign('role_id').references('roles.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('user_roles')
  }
}

module.exports = UserRoleSchema
