'use strict'

const Schema = use('Schema')

class TrailersSchema extends Schema {
  up () {
    this.create('trailers', (table) => {
      table.increments()
      table.integer('vehiculo_id')
      table.foreign('vehiculo_id').references('vehiculos.id').onDelete('cascade')
      table.string('placa').notNullable().unique()
      table.string('tipo_de_vehiculo')
      table.string('tipo_de_configuracion')
      table.string('tenedor')
      table.string('modelo')
      table.string('propietario')
      table.string('tipo_de_flota')
      table.string('poseedor')
      table.string('color')
      table.string('marca_trailer')
      table.string('peso')
      table.string('tipo_carroceria')
      table.string('estado')
      table.string('radica_rndc')
      table.timestamps()
    })
  }

  down () {
    this.drop('trailers')
  }
}

module.exports = TrailersSchema
