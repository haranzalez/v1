'use strict'

const Schema = use('Schema')

class SubModuloSchema extends Schema {
  up () {
    this.create('sub_modulo', (table) => {
      table.increments()
      table.string('nombre')
      table.string('icono')
      table.integer('modulo_id').unsigned().references('id').inTable('modulos').onDelete('cascade')
    })
  }

  down () {
    this.dropIfExists('sub_modulo')
  }
}

module.exports = SubModuloSchema
