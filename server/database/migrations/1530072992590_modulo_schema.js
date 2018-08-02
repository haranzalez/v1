'use strict'

const Schema = use('Schema')

class ModuloSchema extends Schema {
  up () {
    this.create('modulos', (table) => {
      table.increments()
      table.string('nombre').notNullable().unique();
      table.string('descripcion');
      table.string('icono')
    })
  }

  down () {
    this.dropIfExists('modulos')
  }
}

module.exports = ModuloSchema
