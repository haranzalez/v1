'use strict'

const Schema = use('Schema')

class ServicioSchema extends Schema {
  up () {
    this.create('servicios', (table) => {
      table.increments()
      table.string('nombre')
      table.string('descripcion')
      table.float('precio')
      table.timestamps()
    })
  }

  down () {
    this.drop('servicios')
  }
}

module.exports = ServicioSchema
