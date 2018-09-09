'use strict'

const Schema = use('Schema')

class ComentariosRutasSchema extends Schema {
  up () {
    this.create('comentarios_rutas', (table) => {
      table.increments()
      table.integer('ruta_id')
      table.foreign('ruta_id').references('rutas.id').onDelete('cascade')
      table.string('usuario')
      table.string('comentario', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('comentarios_rutas')
  }
}

module.exports = ComentariosRutasSchema
