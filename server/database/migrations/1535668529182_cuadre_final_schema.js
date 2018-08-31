'use strict'

const Schema = use('Schema')

class CuadreFinalSchema extends Schema {
  up () {
    this.create('cuadre_final', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned()
      table.foreign('cliente_id').references('clientes.id').onDelete('cascade')
      table.integer('cuadre_producto_id').unsigned()
      table.foreign('cuadre_producto_id').references('cuadre_productos.id').onDelete('cascade')
      table.integer('cuadre_viaje_id').unsigned()
      table.foreign('cuadre_viaje_id').references('cuadre_viajes.id').onDelete('cascade')
      table.integer('cuadre_servicio_id').unsigned()
      table.foreign('cuadre_servicio_id').references('cuadre_servicios.id').onDelete('cascade')
      table.float('descuento')
      table.float('precio')
      table.string('estado')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_final')
  }
}

module.exports = CuadreFinalSchema
