'use strict'

const Schema = use('Schema')

class TrailersSchema extends Schema {
  up () {
    this.table('trailers', (table) => {
      table.integer('vehiculo_id').unsigned()
      table.foreign('vehiculo_id').references('vehiculos.id')
    })
  }

  down () {
    this.table('trailers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TrailersSchema
