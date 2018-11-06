'use strict'

const Schema = use('Schema')

class ClienteTipoNegociacionsSchema extends Schema {
  up () {
    this.table('cliente_tipo_negociacions', (table) => {
      table.float('cupo')
      table.integer('dias')
    })
  }

  down () {
    this.table('cliente_tipo_negociacions', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ClienteTipoNegociacionsSchema
