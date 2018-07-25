'use strict'

const Schema = use('Schema')

class ModuloChildrenSchema extends Schema {
  up () {
    this.create('modulo_children', (table) => {
      table.increments()
      table.string('nombre')
      table.string('icono')
      table.integer('modulo_id').unsigned().references('id').inTable('modulos')
      table.timestamps()
    })
  }

  down () {
    this.drop('modulo_children')
  }
}

module.exports = ModuloChildrenSchema
