'use strict'
const Database = use('Database')


class TecnomacanicaTrailerController {
   
    async get_tecnomecanica_list({ params }){
        const { trailer_id } = params
        const res = await Database.from('tecnomecanicas_trailers').where('trailer_id', trailer_id)
        return res
    }
    async get_tecnomecanica({ params }){
        const { id } = params
        console.log(id)
        return await Database.from('tecnomecanicas_trailers').where('id', id)
    }
    async create_tecnomecanica({ request }){
        const { 
            numero_tecnomecanica,
            fecha_de_vencimiento,
            trailer_id,
        } = request.all()
        const tecnoComparison = await Database.from('tecnomecanicas_trailers').where({
            trailer_id,
            numero_tecnomecanica
        })

        if(tecnoComparison.length == 0){
            const res = await Database.table('tecnomecanicas_trailers').insert({
                numero_tecnomecanica,
                fecha_de_vencimiento,
                trailer_id,
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
                message: 'Ya existe un registro con el numero de tecnicomecanica '+numero_tecnomecanica+' para este trailer.'
            }
        }
        
        
    }
    async update_tecnomecanica({ params, request }){
        const { 
            numero_tecnomecanica,
            fecha_de_vencimiento,
            trailer_id, 
        } = request.all()
        const { id } = params
        const res = await Database.table('tecnomecanicas_trailers').where('id', id)
        .update({
            numero_tecnomecanica,
            fecha_de_vencimiento,
            trailer_id,
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

    async delete_tecnomecanica({ params }){
        const { id } = params
        const res = await Database.table('tecnomecanicas_trailers').where('id', id).delete()

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

module.exports = TecnomacanicaTrailerController