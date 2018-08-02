'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('nombre', 254)
      table.string('apellido', 254)
      table.string('cedula', 254)
      table.string('tel_fijo', 254)
      table.string('tel_mobil', 254)
      table.string('direccion', 254)
      table.string('ciudad', 254)
      table.string('departamento', 254)
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('estado', 254).defaultTo('inactivo')
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('users')
  }
}

module.exports = UserSchema
