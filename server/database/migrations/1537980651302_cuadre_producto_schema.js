'use strict'

const Schema = use('Schema')

class CuadreProductoSchema extends Schema {
  up () {
    this.create('cuadre_productos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_productos')
  }
}

module.exports = CuadreProductoSchema
