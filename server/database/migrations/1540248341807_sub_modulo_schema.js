'use strict'

const Schema = use('Schema')

class SubModuloSchema extends Schema {
  up () {
    this.table('sub_modulo', (table) => {
      table.string('link')
    })
  }

  down () {
    this.table('sub_modulo', (table) => {
      // reverse alternations
    })
  }
}

module.exports = SubModuloSchema
