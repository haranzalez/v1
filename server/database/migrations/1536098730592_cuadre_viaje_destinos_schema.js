'use strict'

const Schema = use('Schema')

class CuadreViajeDestinosSchema extends Schema {
  up () {
    this.create('cuadre_viaje_destinos', (table) => {
      table.integer('cuadre_viaje_id').unsigned()
      table.integer('destino_id').unsigned()
      table.foreign('cuadre_viaje_id').references('cuadre_viajes.id').onDelete('cascade')
      table.foreign('destino_id').references('destinos.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('cuadre_viaje_destinos')
  }
}

module.exports = CuadreViajeDestinosSchema
