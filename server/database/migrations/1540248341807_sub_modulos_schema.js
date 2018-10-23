'use strict'

const Schema = use('Schema')

class SubModulosSchema extends Schema {
  up () {
    this.table('sub_modulos', (table) => {
      table.string('link')
    })
  }

  down () {
    this.table('sub_modulos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = SubModulosSchema
