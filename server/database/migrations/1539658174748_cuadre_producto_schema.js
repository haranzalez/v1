'use strict'

const Schema = use('Schema')

class CuadreProductoSchema extends Schema {
  up () {
    this.table('cuadre_productos', (table) => {
      table.float('descuento')
      table.float('ganancia')
    })
  }

  down () {
    this.table('cuadre_productos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CuadreProductoSchema
