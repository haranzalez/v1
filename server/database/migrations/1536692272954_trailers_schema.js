'use strict'

const Schema = use('Schema')

class TrailersSchema extends Schema {
  up () {
    this.table('trailers', (table) => {
      table.boolean('radica_rndc')
    })
  }

  down () {
    this.table('trailers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TrailersSchema
