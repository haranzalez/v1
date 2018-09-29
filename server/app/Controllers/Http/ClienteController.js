'use strict'
const Cliente = use('App/Models/Cliente')
class ClienteController {
    //READ
    async get_all_clientes({ params }){
        return await Cliente.all()
    }

    async get_cliente({ params }){
        const { id } = params;
        return await Cliente.query()
        .where('id', id).fetch()
    }

    async create_cliente({ request }){
        const { 
            nombre_razon_social, 
            NIT, 
            direccion, 
            ciudad,
            email,
            telefono,
            celular,
            persona_de_contacto,
            direccion_envio_de_factura,
            tipo_contrato } = request.all()
            
        return await Cliente.create({
            nombre_razon_social, 
            NIT, 
            direccion, 
            ciudad,
            email,
            telefono,
            celular,
            persona_de_contacto,
            direccion_envio_de_factura,
            tipo_contrato,
        })
    }
    //UPDATE
    async update_cliente({ request, params }){
        const { id } = params;
        const cliente = await Cliente.find(id)
        const {
            nombre_razon_social, 
            NIT, 
            direccion, 
            ciudad,
            email,
            telefono,
            celular,
            persona_de_contacto,
            direccion_envio_de_factura,
            tipo_contrato,
        } = request.all()

        cliente.nombre_razon_social = nombre_razon_social 
        cliente.NIT = NIT 
        cliente.direccion = direccion 
        cliente.ciudad = ciudad
        cliente.email = email
        cliente.telefono = telefono
        cliente.celular = celular
        cliente.persona_de_contacto = persona_de_contacto
        cliente.direccion_envio_de_factura = direccion_envio_de_factura
        cliente.tipo_contrato = tipo_contrato
        cliente.save()

        return cliente

    }

     //DELETE
     async delete_cliente({ params }){
        const { id } = params
        const cliente = await Cliente.find(id)
        return cliente.delete()
    }
}

module.exports = ClienteController
