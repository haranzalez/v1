'use strict'
const Database = use('Database')


class DatosBancariosConductoresController {
   
    async get_datos_bancarios_list({ params }){
        const { conductor_id } = params
        const res = await Database.from('datos_bancarios_conductores').where('conductor_id', conductor_id)
       
        return res
    }
    async get_datos_bancarios({ params }){
        const { id } = params
        return await Database.from('datos_bancarios_conductores').where('id', id)
    }
    async create_datos_bancarios({ request }){
        const { 
            conductor_id,
            titular,
            tipo_de_id,
            numero_cuenta_bancaria,
            tipo_cuenta_bancaria,
            banco,
            cuenta_propia, 
        } = request.all()
        const datosBancariosCheck = await Database.from('datos_bancarios_conductores').where({
            conductor_id,
            numero_cuenta_bancaria
        })

        if(datosBancariosCheck.length == 0){
            const res = await Database.table('datos_bancarios_conductores').insert({
                conductor_id,
                titular,
                tipo_de_id,
                numero_cuenta_bancaria,
                tipo_cuenta_bancaria,
                banco,
                cuenta_propia, 
            })
    
            if(res){
                return {
                    message: 'success'
                }
            }
            return {
                message: 'fail'
            }
        }else{
            return {
                message: 'Ya existe un registro con el numero de cuenta '+numero_cuenta_bancaria+' para este conductor.'
            }
        }
        
        
    }
    async update_datos_bancarios({ params, request }){
        const { 
            titular,
            tipo_de_id,
            numero_cuenta_bancaria,
            tipo_cuenta_bancaria,
            banco,
            cuenta_propia, 
        } = request.all()
        const { id } = params
        const res = await Database.table('datos_bancarios_conductores').where('id', id)
        .update({
            titular,
            tipo_de_id,
            numero_cuenta_bancaria,
            tipo_cuenta_bancaria,
            banco,
            cuenta_propia, 
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

    async delete_documento({ params }){
        const { id } = params
        const res = await Database.table('datos_bancarios_conductores').where('id', id).delete()

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

module.exports = DatosBancariosConductoresController