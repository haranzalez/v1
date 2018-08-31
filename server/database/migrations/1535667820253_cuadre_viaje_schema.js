'use strict'

const Schema = use('Schema')

class CuadreViajeSchema extends Schema {
  up () {
    this.create('cuadre_viajes', (table) => {
      table.increments()
      table.integer('destino_id')
      table.foreign('destino_id').references('destinos.id').onDelete('cascade')
      table.float('precio')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_viajes')
  }
}

module.exports = CuadreViajeSchema
