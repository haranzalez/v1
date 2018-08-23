'use strict'

const Schema = use('Schema')

class NegociacionesSchema extends Schema {
  up () {
    this.create('negociaciones', (table) => {
      table.increments()
      table.string('tipo')
      table.integer('plazos')
      table.integer('cuadre_id')
      table.foreign('cuadre_id').references('cuadres.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('negociaciones')
  }
}

module.exports = NegociacionesSchema
