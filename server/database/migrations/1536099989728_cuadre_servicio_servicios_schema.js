'use strict'

const Schema = use('Schema')

class CuadreServicioServiciosSchema extends Schema {
  up () {
    this.create('cuadre_servicio_servicios', (table) => {
      table.integer('cuadre_servicio_id').unsigned()
      table.integer('servicio_id').unsigned()
      table.foreign('cuadre_servicio_id').references('cuadre_servicios.id').onDelete('cascade')
      table.foreign('servicio_id').references('servicios.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('cuadre_servicio_servicios')
  }
}

module.exports = CuadreServicioServiciosSchema
