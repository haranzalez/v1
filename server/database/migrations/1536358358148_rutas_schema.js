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
      table.timestamps()
    })
  }

  down () {
    this.drop('rutas')
  }
}

module.exports = RutasSchema
