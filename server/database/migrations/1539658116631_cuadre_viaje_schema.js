'use strict'

const Schema = use('Schema')

class CuadreViajeSchema extends Schema {
  up () {
    this.table('cuadre_viajes', (table) => {
      table.float('descuento')
      table.float('ganancia')
    })
  }

  down () {
    this.table('cuadre_viajes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CuadreViajeSchema
