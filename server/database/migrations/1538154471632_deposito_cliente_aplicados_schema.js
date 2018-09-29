'use strict'

const Schema = use('Schema')

class DepositoClienteAplicadosSchema extends Schema {
  up () {
    this.create('deposito_cliente_aplicados', (table) => {
      table.increments()
      table.integer('deposito_id')
      table.foreign('deposito_id').references('deposito_clientes.id').onDelete('cascade')
      table.integer('consolidacion_id')
      table.foreign('consolidacion_id').references('consolidaciones.id').onDelete('cascade')
      table.date('fecha_aplicado')
      table.float('cantidad')
      table.timestamps()
    })
  }

  down () {
    this.drop('deposito_cliente_aplicados')
  }
}

module.exports = DepositoClienteAplicadosSchema
