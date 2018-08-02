'use strict'

const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments()
      table.string('nombre', 80).notNullable().unique()
      table.string('description', 254)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('roles')
  }
}

module.exports = RoleSchema
