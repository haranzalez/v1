'use strict'

const Schema = use('Schema')

class RoleSubModuloPermisoSchema extends Schema {
  up () {
    this.create('role_sub_modulo_permisos', (table) => {
      table.increments()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('cascade')
      table.integer('sub_modulo_id').unsigned().references('id').inTable('sub_modulo').onDelete('cascade')
      table.boolean('editar').defaultTo(false)
      table.boolean('crear').defaultTo(false)
      table.boolean('eliminar').defaultTo(false)
      table.timestamps()
    })
  }
  down () {
    this.dropIfExists('role_sub_modulo_permisos')
  }
}

module.exports = RoleSubModuloPermisoSchema
