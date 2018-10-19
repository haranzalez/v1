'use strict'

const Schema = use('Schema')

class ComentariosRutasSchema extends Schema {
  up () {
    this.table('comentarios_rutas', (table) => {
       table.text('comentario')
    })
  }

  down () {
    this.table('comentarios_rutas', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ComentariosRutasSchema
