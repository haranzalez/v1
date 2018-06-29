'use strict'

const Schema = use('Schema')

class PermisosSchema extends Schema {
  up () {
    this.create('permisos', (table) => {
      table.increments()
      table.string('operacion')
      table.timestamps()
    })
  }

  down () {
    this.drop('permisos')
  }
}

module.exports = PermisosSchema
