'use strict'

const Schema = use('Schema')

class ConductoresSchema extends Schema {
  up () {
    this.create('conductores', (table) => {
      table.increments()
      table.integer('vehiculo_id').unsigned()
      table.foreign('vehiculo_id').references('vehiculos.id').onDelete('SET NULL')
      table.integer('codigo')
      table.string('tipo_de_identificacion')
      table.string('cedula')
      table.string('nombres')
      table.string('primer_apellido')
      table.string('segundo_apellido')
      table.string('tipo_de_conductor')
      table.string('direccion')
      table.string('municipio')
      table.string('telefono_1')
      table.string('telefono_2')
      table.string('celular')
      table.string('transportadora')
      table.timestamps()
    })
  }

  down () {
    this.drop('conductores')
  }
}

module.exports = ConductoresSchema
