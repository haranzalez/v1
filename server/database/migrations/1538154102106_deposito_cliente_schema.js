'use strict'

const Schema = use('Schema')

class DepositoClienteSchema extends Schema {
  up () {
    this.create('deposito_clientes', (table) => {
      table.increments()
      table.integer('cliente_id')
      table.foreign('cliente_id').references('clientes.id').onDelete('cascade')
      table.float('cantidad')
      table.date('fecha_deposito')
      table.timestamps()
    })
  }

  down () {
    this.drop('deposito_clientes')
  }
}

module.exports = DepositoClienteSchema
