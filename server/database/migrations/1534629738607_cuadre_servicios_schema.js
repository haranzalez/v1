'use strict'

const Schema = use('Schema')

class CuadreServiciosSchema extends Schema {
  up () {
    this.create('cuadre_servicios', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned()
      table.integer('servicio_id').unsigned()
      table.integer('precio_negociado_id').unsigned()
      table.foreign('cliente_id').references('clientes.id').onDelete('cascade')
      table.foreign('servicio_id').references('servicios.id').onDelete('cascade')
      table.foreign('precio_negociado_id').references('precios_negociados.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_servicios')
  }
}

module.exports = CuadreServiciosSchema
