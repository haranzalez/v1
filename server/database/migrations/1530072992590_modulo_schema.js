'use strict'

const Schema = use('Schema')

class ModuloSchema extends Schema {
  up () {
    this.create('modulos', (table) => {
      table.increments()
      table.string('nombre').notNullable().unique();
      table.string('descripcion');
    })
  }

  down () {
    this.drop('modulos')
  }
}

module.exports = ModuloSchema
