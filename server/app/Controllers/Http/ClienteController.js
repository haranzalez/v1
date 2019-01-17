'use strict'
const Cliente = use('App/Models/Cliente')
const Database = use('Database')
const TipoNegociacion = use('App/Models/ClienteTipoNegociacion')
class ClienteController {
    //READ
    async get_all_clientes({ params }){
        return await Cliente.all()
    }

    async get_cliente({ params }){
        console.log(params)
        const { id } = params;
        const client = await Cliente.query()
        .with('tipo_negociacion')
        .with('deposito')
        .where('id', id).fetch()
        console.log(client.rows[0])
        return (client.rows.length > 0)?client.rows[0]:[]
    }
    async get_cuadres_viajes({ params }){
        const { id } = params;
        const client = await Cliente.find(id)
        const res = await client.cuadre_viaje().with('ruta.municipios').fetch()
        if(res.rows.length > 0){
            for(let prop in res.rows){
                if(res.rows[prop].$relations.ruta.rows.length > 0){
                    res.rows[prop]['ruta'] = res.rows[prop].$relations.ruta.rows[0].$relations.municipios.rows[0].nombre_municipio + ' - ' + res.rows[prop].$relations.ruta.rows[0].$relations.municipios.rows[1].nombre_municipio
                    delete res.rows[prop].$relations
                }
            }
        }
        return res
    }
    async get_cuadres_productos({ params }){
        const { id } = params;
        const client = await Cliente.find(id)
        console.log(id, client)
        const res = await client.cuadre_producto().with('producto').fetch()
            for(let prop in res.rows){
                if(res.rows[prop].$relations.producto.rows.length > 0){
                    res.rows[prop]['producto'] = res.rows[prop].$relations.producto.rows[0].nombre
                    res.rows[prop]['precio_producto'] = res.rows[prop].$relations.producto.rows[0].precio
                }
                delete res.rows[prop].$relations
            }
        return res
    }
    async get_cuadres_servicios({ params }){
        const { id } = params;
        const client = await Cliente.find(id)
        const res = await client.cuadre_servicio().with('servicio').fetch()
            for(let prop in res.rows){
                if(res.rows[prop].$relations.servicio.rows.length > 0){
                    res.rows[prop]['nombre_servicio'] = res.rows[prop].$relations.servicio.rows[0].nombre
                    res.rows[prop]['precio_servicio'] = res.rows[prop].$relations.servicio.rows[0].precio
                }
                delete res.rows[prop].$relations
            }
        return res
    }
    async create_cliente({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
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
            contrato,
            cupo,
            dias,
            radica_rndc,
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
            radica_rndc,
        })

        await TipoNegociacion.create({
            cliente_id: cliente.id,
            contrato,
            cupo,
            dias,
        })

        return {
            message: "success"
        }
    }
    //UPDATE
    async update_cliente({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
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
            contrato,
            cupo,
            dias,
            radica_rndc,
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
        cliente.radica_rndc = radica_rndc
        cliente.save()

        const neg = await cliente.tipo_negociacion().fetch()
        if(neg !== null){
            neg.contrato = contrato
            neg.cupo = cupo
            neg.dias = dias
            neg.save()
        }else{
            await TipoNegociacion.create({
                cliente_id: cliente.id,
                contrato,
                cupo,
                dias,
            })
        }
       

        return {
            message: 'success',
        }

    }

     //DELETE
     async delete_cliente({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const cliente = await Cliente.find(id)
        return cliente.delete()
    }

    //==============================================================================//
    //=========================== DEPOSITOS ========================================//
    //==============================================================================//

    async fetch_depositos({ params }) {
       const { id } = params
       return await Database.from('deposito_clientes').where('cliente_id', id)

    }
    async fetch_deposito({ params }) {
        const { deposito_id } = params
        return await Database.from('deposito_clientes').where('id', deposito_id)
     }

    async create_deposito({ auth, params, request }) {
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const { 
            cantidad,
            fecha_deposito
        } = request.all()
        await Database
        .table('deposito_clientes')
        .insert({
            cliente_id: id,
            cantidad,
            fecha_deposito
        })
        return {
            message: 'success'
        }

    }
    async update_deposito({ auth, params, request }) {
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id, deposito_id } = params
        const { 
            cantidad,
            fecha_deposito
        } = request.all()
        await Database
        .table('deposito_clientes')
        .where('id', deposito_id)
        .update(
        {
            cantidad,
            fecha_deposito
        })
        return {
            message: 'success'
        }

    }

}

module.exports = ClienteController
