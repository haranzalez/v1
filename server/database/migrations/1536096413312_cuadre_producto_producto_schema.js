'use strict'

const Schema = use('Schema')

class CuadreProductoProductoSchema extends Schema {
  up () {
    this.create('cuadre_producto_productos', (table) => {
      table.integer('cuadre_producto_id').unsigned()
      table.integer('producto_id').unsigned()
      table.foreign('cuadre_producto_id').references('cuadre_productos.id').onDelete('cascade')
      table.foreign('producto_id').references('productos.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('cuadre_producto_productos')
  }
}

module.exports = CuadreProductoProductoSchema
