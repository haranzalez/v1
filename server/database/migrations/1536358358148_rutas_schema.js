'use strict'

const Schema = use('Schema')

class RutasSchema extends Schema {
  up () {
    this.create('rutas', (table) => {
      table.increments()
      table.float('kilometros')
      table.float('anticipo_sugerido')
      table.float('valor_flete')
      table.float('pago_conductor_hq')
      table.float('pago_tercero')
      table.float('pago_cabezote')
      table.integer('municipio_origen_id')
      table.foreign('municipio_origen_id').references('municipios.id')
      table.integer('municipio_destino_id')
      table.foreign('municipio_destino_id').references('municipios.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('rutas')
  }
}

module.exports = RutasSchema
