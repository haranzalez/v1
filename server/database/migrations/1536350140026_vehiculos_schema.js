'use strict'

const Schema = use('Schema')

class VehiculosSchema extends Schema {
  up () {
    this.create('vehiculos', (table) => {
      table.increments()
      table.string('placa').notNullable().unique()
      table.string('numero_chasis').notNullable().unique()
      table.string('tipo_de_vehiculo')
      table.string('tipo_configuracion')
      table.string('modelo')
      table.string('numero_motor').notNullable().unique()
      table.string('tipo_de_flota')
      table.string('marca_cabezote')
      table.string('linea_cabezote')
      table.string('tipo_de_combustible')
      table.string('color')
      table.float('peso')
      table.float('capasidad_carga')
      table.timestamps()
    })
  }

  down () {
    this.drop('vehiculos')
  }
}

module.exports = VehiculosSchema
