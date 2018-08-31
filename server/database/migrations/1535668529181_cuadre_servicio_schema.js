'use strict'

const Schema = use('Schema')

class CuadreServicioSchema extends Schema {
  up () {
    this.create('cuadre_servicios', (table) => {
      table.increments()
      table.integer('servicio_id')
      table.foreign('servicio_id').references('servicios.id').onDelete('cascade')
      table.float('precio')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_servicios')
  }
}

module.exports = CuadreServicioSchema
