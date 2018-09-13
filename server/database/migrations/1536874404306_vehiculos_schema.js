'use strict'

const Schema = use('Schema')

class VehiculosSchema extends Schema {
  up () {
    this.table('vehiculos', (table) => {
      table.string('estado')
    })
  }

  down () {
    this.table('vehiculos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = VehiculosSchema
