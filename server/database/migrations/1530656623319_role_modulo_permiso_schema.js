'use strict'

const Schema = use('Schema')

class RolModuloPermisoSchema extends Schema {
  up () {
    this.create('role_modulo_permisos', (table) => {
      table.integer('role_id').unsigned()
      table.integer('modulo_id').unsigned()
      table.integer('permiso_id').unsigned()
      table.foreign('role_id').references('roles.id').onDelete('cascade')
      table.foreign('modulo_id').references('modulos.id').onDelete('cascade')
      table.foreign('permiso_id').references('permisos.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('rol_modulo_permisos')
  }
}

module.exports = RolModuloPermisoSchema
