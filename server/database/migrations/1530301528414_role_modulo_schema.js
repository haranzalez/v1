'use strict'

const Schema = use('Schema')

class RoleModuloSchema extends Schema {
  up () {
    this.create('role_modulos', (table) => {
      table.integer('role_id').unsigned()
      table.integer('modulo_id').unsigned()
      table.foreign('role_id').references('roles.id').onDelete('cascade')
      table.foreign('modulo_id').references('modulos.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('role_modulos')
  }
}

module.exports = RoleModuloSchema
