'use strict'

const Schema = use('Schema')

class PasswordRequestSchema extends Schema {
  up () {
    this.create('password_requests', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('ip')
      table.string('token')
      table.string('expires')
      table.timestamps()
    })
  }

  down () {
    this.drop('password_requests')
  }
}

module.exports = PasswordRequestSchema
