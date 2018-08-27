'use strict'

const Schema = use('Schema')

class PreciosNegociadosSchema extends Schema {
  up () {
    this.create('precios_negociados', (table) => {
      table.increments()
      table.numeric('precio')
      table.string('tipo_cuadre')
      table.integer('cuadre_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('precios_negociados')
  }
}

module.exports = PreciosNegociadosSchema
