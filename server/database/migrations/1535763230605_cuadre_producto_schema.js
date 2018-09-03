'use strict'

const Schema = use('Schema')

class CuadreProductoSchema extends Schema {
  up () {
    this.table('cuadre_productos', (table) => {
      table.integer('cuadre_final_id').unsigned()
      table.foreign('cuadre_final_id').references('cuadre_finals.id').onDelete('cascade')
    })
    
  }

  down () {
    this.table('cuadre_productos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CuadreProductoSchema
