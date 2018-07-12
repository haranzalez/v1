'use strict'

const Schema = use('Schema')

class RoleModuloPermisoSchema extends Schema {
  up () {
    this.create('role_modulo_permisos', (table) => {
      table.integer('role_id').unsigned()
      table.integer('modulo_id').unsigned()
      table.foreign('role_id').references('roles.id').onDelete('cascade')
      table.foreign('modulo_id').references('modulos.id').onDelete('cascade')
      table.boolean('editar').defaultTo(false)
      table.boolean('crear').defaultTo(false)
      table.boolean('eliminar').defaultTo(false)
    })
  }

  down () {
    this.drop('role_modulo_permisos')
  }
}

module.exports = RoleModuloPermisoSchema
