'use strict'

const Schema = use('Schema')

class RutasSchema extends Schema {
  up () {
    this.create('rutas', (table) => {
      table.increments()
      table.float('kilometros')
      table.float('anticipo_sugerido')
      table.float('valor_flete')
      table.timestamps()
    })
  }

  down () {
    this.drop('rutas')
  }
}

module.exports = RutasSchema
