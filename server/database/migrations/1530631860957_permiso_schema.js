'use strict'

const Schema = use('Schema')

class PermisoSchema extends Schema {
  up () {
    this.create('permisos', (table) => {
      table.increments()
      table.string('operacion').notNullable().unique();
      table.timestamps()
    })
  }

  down () {
    this.drop('permisos')
  }
}

module.exports = PermisoSchema
