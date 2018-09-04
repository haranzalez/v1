'use strict'

const Schema = use('Schema')

class CuadreViajeSchema extends Schema {
  up () {
    
      this.table('cuadre_viajes', (table) => {
        table.integer('cuadre_final_id').unsigned()
        table.foreign('cuadre_final_id').references('cuadre_finals.id').onDelete('cascade')
      })

  }

  down () {
    this.table('cuadre_viajes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CuadreViajeSchema
