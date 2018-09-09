'use strict'

const Schema = use('Schema')

class CuadreViajeSchema extends Schema {
  up () {
    this.create('cuadre_viajes', (table) => {
      table.increments()
      table.integer('consolidacion_id')
      table.foreign('consolidacion_id').references('consolidacions.id').onDelete('cascade')
      table.float('flete')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_viajes')
  }
}

module.exports = CuadreViajeSchema
