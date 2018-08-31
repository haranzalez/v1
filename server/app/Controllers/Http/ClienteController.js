'use strict'
const Cliente = use('App/Models/Cliente')
class ClienteController {
    async todos(){
        return await Cliente.all()
    }

    async porCliente({request}){
        const { cid } = request.all()
        return await Cliente.find(cid)
    }

    async crearCliente({ request }){
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
}

module.exports = ClienteController
