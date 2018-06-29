'use strict'

const Schema = use('Schema')

class RoleModuloSchema extends Schema {
  up () {
    this.create('role_modulos', (table) => {
      table.integer('role_id').unsigned().index('roleid');
      table.integer('module_id').unsigned().index('module_id');
      table.foreign('role_id').references('roles.id').onDelete('cascade');
      table.foreign('module_id').references('modulos.id').onDelete('cascade');
    })
  }

  down () {
    this.drop('role_modulos')
  }
}

module.exports = RoleModuloSchema
