'use strict'

const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments()
      table.string('nombre_razon_social')
      table.string('NIT')
      table.string('direccion')
      table.string('ciudad')
      table.string('email')
      table.string('telefono')
      table.string('celular')
      table.string('persona_de_contacto')
      table.string('direccion_envio_de_factura')
      table.string('tipo_contrato')
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema
