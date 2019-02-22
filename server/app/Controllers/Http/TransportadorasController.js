'use strict'
const Database = use('Database')

class TransportadorasController {

    //READ
    async get_all_transportadoras({ params }){
        return await Database.select('*').from('transportadoras')
    }

    async get_transportadora({ params }){
        const { id } = params;
        return await Database.from('transportadoras').where('id', id)
    }
    
    //CREATE
    async create_transportadora({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const {
            nit,
            razon_social,
            direccion,
            telefono,
            contacto,
            banco,
            numero_de_cuenta,
            pagos,
            anticipo,
            tipo_de_cuenta,
            radica_rndc
        } = request.all()
        const checkDuplicate = await Database.from('transportadoras').where('nit', nit)
        if(checkDuplicate.length == 0){
            await Database
            .table('transportadoras')
            .insert({
                nit,
                razon_social,
                direccion,
                telefono,
                contacto,
                banco,
                numero_de_cuenta,
                pagos,
                anticipo,
                tipo_de_cuenta,
                radica_rndc
            })

            return {
                message: 'success'
            }
        }
        return {
            message: 'Ya existe una transportadora con el NIT: '+nit+' en los registros.'
        }
        

    }
    //UPDATE
    async update_transportadora({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params;
        const {
            nit,
            razon_social,
            direccion,
            telefono,
            contacto,
            banco,
            numero_de_cuenta,
            pagos,
            anticipo,
            tipo_de_cuenta,
            radica_rndc
        } = request.all()

        await Database
        .table('transportadoras')
        .where('id', id)
        .update({ 
            nit,
            razon_social,
            direccion,
            telefono,
            contacto,
            banco,
            numero_de_cuenta,
            pagos,
            anticipo,
            tipo_de_cuenta,
            radica_rndc
         })

        return {
            message: 'success'
        }

    }

     //DELETE
     async delete_transportadora({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        await Database
        .table('transportadoras')
        .where('id', id)
        .delete()
        return {
            message: 'success'
        }
    }
}

module.exports = TransportadorasController
