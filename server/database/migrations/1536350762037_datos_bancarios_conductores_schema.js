'use strict'

const Schema = use('Schema')

class DatosBancariosConductoresSchema extends Schema {
  up () {
    this.create('datos_bancarios_conductores', (table) => {
      table.increments()
      table.integer('conductor_id')
      table.foreign('conductor_id').references('conductores.id').onDelete('cascade')
      table.string('titular')
      table.string('tipo_de_id')
      table.string('numero_cuenta')
      table.string('tipo_cuenta')
      table.string('banco')
      table.string('cuenta_propia')
      table.string('radica_rndc')
      table.timestamps()
    })
  }

  down () {
    this.drop('datos_bancarios_conductores')
  }
}

module.exports = DatosBancariosConductoresSchema
