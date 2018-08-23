'use strict'

const Schema = use('Schema')

class CuadreProductosSchema extends Schema {
  up () {
    this.create('cuadre_productos', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned()
      table.integer('producto_id').unsigned()
      table.integer('negociacion_id').unsigned()
      table.integer('contrato_id').unsigned()
      table.integer('precio_id').unsigned()
      table.numeric('descuento').defaultTo(0)
      table.foreign('cliente_id').references('clientes.id').onDelete('cascade')
      table.foreign('producto_id').references('productos.id').onDelete('cascade')
      table.foreign('negociacion_id').references('negociaciones.id').onDelete('cascade')
      table.foreign('contrato_id').references('contratos.id').onDelete('cascade')
      table.foreign('precio_id').references('precios_producto.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('cuadre_productos')
  }
}

module.exports = CuadreProductosSchema
