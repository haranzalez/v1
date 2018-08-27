'use strict'

const Schema = use('Schema')

class ClientesSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments()
      table.string('nombre_/_razon_social').notNullable().unique()
      table.string('NIT').notNullable().unique()
      table.string('direccion')
      table.string('ciudad')
      table.string('email').notNullable().unique()
      table.string('telefono')
      table.string('celular')
      table.string('persona_de_contacto')
      table.string('direccion_envio_de_factura')
      table.string('correo_electronico_facturacion_electronica').notNullable().unique()
      table.string('tipo_de_contrato')
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClientesSchema
