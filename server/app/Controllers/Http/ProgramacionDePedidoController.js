'use strict'
const Database = use('Database')

class ProgramacionDePedidoController {
    
    async get_programaciones(){
        const res = await Database.select('*').from('programacion_de_pedidos')
       
        return res
    }
    async get_programacion({ params }){
        const { id } = params
        return await Database.from('programacion_de_pedidos').where('id', id)
    }
    async get_programacion_by_client({ params }){
        const { client_id } = params
        return await Database.from('programacion_de_pedidos').where('client_id', client_id)
    }
    async get_remitente({ params }){
        const { programacion_de_pedidos_id } = params
        return await Database.from('remitente_pedidos').where({programacion_de_pedidos_id})
    }
    async get_destinatario({ params }){
        const { programacion_de_pedidos_id } = params
        return await Database.from('destinatario_pedidos').where({programacion_de_pedidos_id})
    }

    async create_programacion({ request }){
        const {
            tipo_de_operacion,
            tipo_de_empaque,
            naturaleza_de_carga,
            producto_id,
            cantidad_cargada,
            codigo_producto,
            cliente_id,
        } = request.all();

        const res = await Database.table('programacion_de_pedidos').insert({
            tipo_de_operacion,
            tipo_de_empaque,
            naturaleza_de_carga,
            producto_id,
            cantidad_cargada,
            codigo_producto,
            cliente_id,
        })

        return {
            message: 'success'
        }
    }

    async update_programacion({ params, request }){
        const { 
            tipo_de_operacion,
            tipo_de_empaque,
            naturaleza_de_carga,
            producto_id,
            cantidad_cargada,
            codigo_producto,
            cliente_id, 
        } = request.all()
        const { id } = params
        const res = await Database.table('programacion_de_pedidos').where('id', id)
        .update({
            tipo_de_operacion,
            tipo_de_empaque,
            naturaleza_de_carga,
            producto_id,
            cantidad_cargada,
            codigo_producto,
            cliente_id,
        })

        if(res){
            return {
                message: 'success'
            }
        }
        return {
            message: 'fail'
        }
        
    }

    async create_remitente({ request }){
        const {
            tipo_de_id,
            numero_de_id,
            codigo_sede,
            tiempos_pactados,
            horas,
            minutos,
            fecha_de_cargue,
            programacion_de_pedidos_id
        } = request.all();

        const checkDuplicate = await Database.from('remitente_pedidos').where({
            programacion_de_pedidos_id
        })
        if(checkDuplicate.length == 0){
            const res = await Database.table('remitente_pedidos').insert({
                tipo_de_id,
                numero_de_id,
                codigo_sede,
                tiempos_pactados,
                horas,
                minutos,
                fecha_de_cargue,
                programacion_de_pedidos_id
            })
            return {
                message: 'success'
            }
        }else{
            return {
                message: 'Ya existe un remitente para esta programacion.'
            }
        }
    }
    async update_remitente({ params, request }){
        const { 
            tipo_de_id,
            numero_de_id,
            codigo_sede,
            tiempos_pactados,
            horas,
            minutos,
            fecha_de_cargue,
            programacion_de_pedidos_id,
        } = request.all()
        const { id } = params
        const res = await Database.table('remitente_pedidos ').where('id', id)
        .update({
            tipo_de_id,
            numero_de_id,
            codigo_sede,
            tiempos_pactados,
            horas,
            minutos,
            fecha_de_cargue,
            programacion_de_pedidos_id,
        })

        if(res){
            return {
                message: 'success' 
            }
        }
        return {
            message: 'fail'
        }
        
    }

    async create_destinatario({ request }){
        const {
            tipo_de_id,
            numero_de_id,
            codigo_sede,
            tiempos_pactados,
            horas,
            minutos,
            fecha_de_descargue,
            programacion_de_pedidos_id
        } = request.all();

        const checkDuplicate = await Database.from('destinatario_pedidos').where({
            programacion_de_pedidos_id
        })
        if(checkDuplicate.length == 0){
            const res = await Database.table('destinatario_pedidos').insert({
                tipo_de_id,
                numero_de_id,
                codigo_sede,
                tiempos_pactados,
                horas,
                minutos,
                fecha_de_descargue,
                programacion_de_pedidos_id
            })
            return {
                message: 'success'
            }
        }else{
            return {
                message: 'Ya existe un destinatario para esta programacion.'
            }
        }
    }
    async update_destinatario({ params, request }){
        const { 
            tipo_de_id,
            numero_de_id,
            codigo_sede,
            tiempos_pactados,
            horas,
            minutos,
            fecha_de_descargue,
            programacion_de_pedidos_id
        } = request.all() 
        const { id } = params
        const res = await Database.table('destinatario_pedidos').where('id', id)
        .update({
            tipo_de_id,
            numero_de_id,
            codigo_sede,
            tiempos_pactados,
            horas,
            minutos,
            fecha_de_descargue,
            programacion_de_pedidos_id
        })

        if(res){
            return {
                message: 'success' 
            }
        }
        return {
            message: 'fail'
        }
        
    }


}

module.exports = ProgramacionDePedidoController
