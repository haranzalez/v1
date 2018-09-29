'use strict'

const Schema = use('Schema')

class CuadreProductoSchema extends Schema {
  up () {
    this.table('cuadre_productos', (table) => {
      table.float('precio')
    })
  }

  down () {
    this.table('cuadre_productos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CuadreProductoSchema
