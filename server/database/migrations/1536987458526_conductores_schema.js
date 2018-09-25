'use strict'

const Schema = use('Schema')

class ConductoresSchema extends Schema {
  up () {
    this.table('conductores', (table) => {
      table.integer('vehiculo_id').unsigned()
      table.foreign('vehiculo_id').references('vehiculos.id').onDelete('SET NULL')
    })
  }

  down () {
    this.table('conductores', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ConductoresSchema
