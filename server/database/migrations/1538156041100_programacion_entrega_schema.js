'use strict'

const Schema = use('Schema')

class ProgramacionEntregaSchema extends Schema {
  up () {
    this.create('programacion_entregas', (table) => {
      table.increments()
      table.integer('consolidacion_id')
      table.foreign('consolidacion_id').references('consolidacions.id').onDelete('cascade')
      table.date('fecha_solicitud')
      table.date('fecha_despacho')
      table.date('fecha_entrega_programada')
      table.date('fecha_entrega_real')
      table.timestamps()
    })
  }

  down () {
    this.drop('programacion_entregas')
  }
}

module.exports = ProgramacionEntregaSchema
