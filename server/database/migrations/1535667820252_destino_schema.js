'use strict'

const Schema = use('Schema')

class DestinoSchema extends Schema {
  up () {
    this.create('destinos', (table) => {
      table.increments()
      table.string('nombre')
      table.string('direccion')
      table.string('telefono')
      table.string('contacto')
      table.timestamps()
    })
  }

  down () {
    this.drop('destinos')
  }
}

module.exports = DestinoSchema
