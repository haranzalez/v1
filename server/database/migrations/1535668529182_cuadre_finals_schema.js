'use strict'

const Schema = use('Schema')

class CuadreFinalSchema extends Schema {
  up () {
    this.create('cuadre_finals', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned()
      table.foreign('cliente_id').references('clientes.id').onDelete('cascade')
      table.float('descuento')
      table.float('precio')
      table.string('estado')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_finals')
  }
}

module.exports = CuadreFinalSchema
