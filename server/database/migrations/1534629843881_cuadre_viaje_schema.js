'use strict'

const Schema = use('Schema')

class CuadreViajeSchema extends Schema {
  up () {
    this.create('cuadre_viajes', (table) => {
      table.increments()
      table.integer('cuadre_producto_id').unsigned()
      table.integer('flete_id').unsigned()
      table.integer('destino_id').unsigned()
     
      table.foreign('cuadre_producto_id').references('cuadre_productos.id').onDelete('cascade')
      table.foreign('flete_id').references('fletes.id').onDelete('cascade')
      table.foreign('destino_id').references('destinos.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_viajes')
  }
}

module.exports = CuadreViajeSchema
