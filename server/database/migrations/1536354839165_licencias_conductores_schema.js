'use strict'

const Schema = use('Schema')

class LicenciasConductoresSchema extends Schema {
  up () {
    this.create('licencias_conductores', (table) => {
      table.increments()
      table.integer('conductor_id')
      table.foreign('conductor_id').references('conductores.id').onDelete('cascade')
      table.string('numero_de_licencia')
      table.string('categoria')
      table.date('fecha_de_vencimiento')
      table.timestamps()
    })
  }

  down () {
    this.drop('licencias_conductores')
  }
}

module.exports = LicenciasConductoresSchema
