'use strict'

const Schema = use('Schema')

class UserLogsSchema extends Schema {
  up () {
    this.create('user_logs', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('ip')
      table.string('token')
      table.boolean('is_revoke')
      table.timestamp('entrada').defaultTo(this.fn.now())
      table.timestamp('salida')
    })
  }

  down () {
    this.drop('user_logs')
  }
}

module.exports = UserLogsSchema
