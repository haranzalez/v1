'use strict'

const Schema = use('Schema')

class PivotCuadreViajeRutasSchema extends Schema {
  up () {
    this.create('pivot_cuadre_viaje_rutas', (table) => {
      table.integer('cuadre_viaje_id')
      table.foreign('cuadre_viaje_id').references('cuadre_viajes.id').onDelete('cascade')
      table.integer('ruta_id')
      table.foreign('ruta_id').references('rutas.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('pivot_cuadre_viaje_rutas')
  }
}

module.exports = PivotCuadreViajeRutasSchema
