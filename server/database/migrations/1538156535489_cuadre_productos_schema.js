'use strict'

const Schema = use('Schema')

class CuadreProductosSchema extends Schema {
  up () {
    this.table('cuadre_productos', (table) => {
      table.integer('consolidacion_id')
      table.foreign('consolidacion_id').references('consolidacions.id').onDelete('cascade')
    })
  }

  down () {
    this.table('cuadre_productos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CuadreProductosSchema
