'use strict'

const Schema = use('Schema')

class PivotRutasMunicipiosSchema extends Schema {
  up () {
    this.create('pivot_rutas_municipios', (table) => {
      table.integer('ruta_id')
      table.foreign('ruta_id').references('rutas.id').onDelete('cascade')
      table.integer('municipio_id')
      table.foreign('municipio_id').references('municipios.id').onDelete('cascade')
      table.string('role')
    })
  }

  down () {
    this.drop('pivot_rutas_municipios')
  }
}

module.exports = PivotRutasMunicipiosSchema
