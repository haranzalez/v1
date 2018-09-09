'use strict'

const Schema = use('Schema')

class PivotCuadreViajeVehiculoSchema extends Schema {
  up () {
    this.create('pivot_cuadre_viaje_vehiculos', (table) => {
      table.integer('cuadre_viaje_id')
      table.foreign('cuadre_viaje_id').references('cuadre_viajes.id').onDelete('cascade')
      table.integer('vehiculo_id')
      table.foreign('vehiculo_id').references('vehiculos.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('pivot_cuadre_viaje_vehiculos')
  }
}

module.exports = PivotCuadreViajeVehiculoSchema
