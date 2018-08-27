'use strict'

const Schema = use('Schema')

class CuadreProductosSchema extends Schema {
  up () {
    this.create('cuadre_productos', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned()
      table.integer('producto_id').unsigned()
      table.integer('precio_negociado_id').unsigned()
      table.foreign('cliente_id').references('clientes.id').onDelete('cascade')
      table.foreign('producto_id').references('productos.id').onDelete('cascade')
      table.foreign('precio_negociado_id').references('precios_negociados.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_productos')
  }
}

module.exports = CuadreProductosSchema
