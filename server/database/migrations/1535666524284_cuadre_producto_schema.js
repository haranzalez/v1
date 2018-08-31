'use strict'

const Schema = use('Schema')

class CuadreProductoSchema extends Schema {
  up () {
    this.create('cuadre_productos', (table) => {
      table.increments()
      table.integer('producto_id').unsigned()
      table.foreign('producto_id').references('productos.id').onDelete('cascade')
      table.float('precio')
      table.float('toneladas')
      table.float('kilogramos')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_productos')
  }
}

module.exports = CuadreProductoSchema
