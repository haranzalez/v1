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
        .with('cuadre_viaje')
        .where('id', id).fetch()
    }
    async get_cuadres_viajes({ params }){
        const { id } = params;
        const client = await Cliente.find(id)
        const res = await client.cuadre_viaje().with('ruta.municipios').fetch()
        for(let prop in res.rows){
            res.rows[prop]['ruta'] = res.rows[prop].$relations.ruta.rows[0].$relations.municipios.rows[0].nombre_municipio + ' - ' + res.rows[prop].$relations.ruta.rows[0].$relations.municipios.rows[1].nombre_municipio
            delete res.rows[prop].$relations
        }
        return res
    }
    async get_cuadres_productos({ params }){
        const { id } = params;
        const client = await Cliente.find(id)
        const res = await client.cuadre_producto().with('producto').fetch()
        for(let prop in res.rows){
            res.rows[prop]['producto'] = res.rows[prop].$relations.producto.rows[0].nombre
            res.rows[prop]['precio_producto'] = res.rows[prop].$relations.producto.rows[0].precio
            delete res.rows[prop].$relations
        }
        return res
    }
    async create_cliente({ request }){
        const { 
            nombre_razon_social, 
            nit, 
            direccion, 
            ciudad,
            email,
            telefono,
            celular,
            persona_de_contacto,
            direccion_envio_de_factura,
            tipo_contrato 
        } = request.all()
            
        const cliente = await Cliente.create({
            nombre_razon_social, 
            nit, 
            direccion, 
            ciudad,
            email,
            telefono,
            celular,
            persona_de_contacto,
            direccion_envio_de_factura,
            tipo_contrato,
        })

        return {
            message: "success",
            cliente: cliente,
        }
    }
    //UPDATE
    async update_cliente({ request, params }){
        const { id } = params;
        const cliente = await Cliente.find(id)
        const {
            nombre_razon_social, 
            nit, 
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
        cliente.nit = nit 
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
