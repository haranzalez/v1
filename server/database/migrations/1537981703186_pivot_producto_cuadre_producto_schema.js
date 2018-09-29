'use strict'

const Schema = use('Schema')

class PivotProductoCuadreProductoSchema extends Schema {
  up () {
    this.create('pivot_producto_cuadre_productos', (table) => {
      table.integer('cuadre_producto_id')
      table.foreign('cuadre_producto_id').references('cuadre_productos.id').onDelete('cascade')
      table.integer('producto_id')
      table.foreign('producto_id').references('productos.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('pivot_producto_cuadre_productos')
  }
}

module.exports = PivotProductoCuadreProductoSchema
