'use strict'

const Schema = use('Schema')

class DestinosSchema extends Schema {
  up () {
    this.create('destinos', (table) => {
      table.increments()
      table.string('nombre').notNullable().unique()
      table.string('direccion').notNullable().unique()
      table.string('ciudad')
      table.string('departamento')
      table.timestamps()
    })
  }

  down () {
    this.drop('destinos')
  }
}

module.exports = DestinosSchema
