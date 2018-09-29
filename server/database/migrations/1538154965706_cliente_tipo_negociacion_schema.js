'use strict'

const Schema = use('Schema')

class ClienteTipoNegociacionSchema extends Schema {
  up () {
    this.create('cliente_tipo_negociacions', (table) => {
      table.increments()
      table.integer('cliente_id')
      table.foreign('cliente_id').references('clientes.id').onDelete('cascade')
      table.string('tipo')
      table.string('plazo')
      table.timestamps()
    })
  }

  down () {
    this.drop('cliente_tipo_negociacions')
  }
}

module.exports = ClienteTipoNegociacionSchema
