'use strict'

const Schema = use('Schema')

class ConsolidacionSchema extends Schema {
  up () {
    this.create('consolidacions', (table) => {
      table.increments()
      table.integer('cliente_id')
      table.foreign('cliente_id').references('clientes.id').onDelete('cascade')
      table.float('precio_real')
      table.float('descuento')
      table.float('precio_final')
      table.timestamps()
    })
  }

  down () {
    this.drop('consolidacions')
  }
}

module.exports = ConsolidacionSchema
