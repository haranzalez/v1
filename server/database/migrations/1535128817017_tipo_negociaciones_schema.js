'use strict'

const Schema = use('Schema')

class TipoNegociacionesSchema extends Schema {
  up () {
    this.create('tipo_negociaciones', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned()
      table.string('tipo')
      table.string('plazos')
      table.foreign('cliente_id').references('cliente.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('tipo_negociaciones')
  }
}

module.exports = TipoNegociacionesSchema
