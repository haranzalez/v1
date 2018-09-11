'use strict'

const Schema = use('Schema')

class ConductoresSchema extends Schema {
  up () {
    this.table('conductores', (table) => {
      table.string('municipio_documento')
    })
  }

  down () {
    this.table('conductores', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ConductoresSchema
