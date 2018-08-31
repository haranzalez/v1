'use strict'

const Schema = use('Schema')

class ProductosSchema extends Schema {
  up () {
    this.create('productos', (table) => {
      table.increments()
      table.string('nombre')
      table.string('descripcion')
      table.float('precio')
    })
  }

  down () {
    this.drop('productos')
  }
}

module.exports = ProductosSchema
