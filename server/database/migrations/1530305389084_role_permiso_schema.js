'use strict'

const Schema = use('Schema')

class RolePermisoSchema extends Schema {
  up () {
    this.create('role_permisos', (table) => {
      table.integer('role_id').unsigned()
      table.integer('permiso_id').unsigned()
      table.foreign('role_id').references('roles.id').onDelete('cascade')
      table.foreign('permiso_id').references('permisos.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('role_permisos')
  }
}

module.exports = RolePermisoSchema
