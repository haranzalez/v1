'use strict'
const Database = use('Database')


class DocumentosTrailerController {
   
    async get_documentos_list({ params }){
        const { trailer_id } = params
        const res = await Database.from('documentos_trailers').where('trailer_id', trailer_id)
        for(let prop in res){
            res[prop]['aseguradora'] = await Database.from('aseguradoras').where('id', res[prop].aseguradora_id)
        }
        return res
    }
    async get_documento({ params }){
        const { id } = params
        return await Database.from('documentos_trailers').where('id', id)
    }
    async create_documento({ request }){
        const { 
            aseguradora_id, 
            tipo_de_poliza, 
            numero_de_poliza, 
            fecha_de_vencimiento, 
            trailer_id 
        } = request.all()
        const polizaComparison = await Database.from('documentos_trailers').where({
            trailer_id,
            tipo_de_poliza
        })

        if(polizaComparison.length == 0){
            const res = await Database.table('documentos_trailers').insert({
                aseguradora_id, 
                tipo_de_poliza, 
                numero_de_poliza, 
                fecha_de_vencimiento, 
                trailer_id
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
                message: 'Ya existe un registro con tipo de poliza '+tipo_de_poliza+' para este trailer.'
            }
        }
        
        
    }
    async update_documento({ params, request }){
        const { 
            aseguradora_id, 
            tipo_de_poliza, 
            numero_de_poliza, 
            fecha_de_vencimiento, 
            trailer_id 
        } = request.all()
        const { id } = params
        const res = await Database.table('documentos_trailers').where('id', id)
        .update({
            aseguradora_id, 
            tipo_de_poliza, 
            numero_de_poliza, 
            fecha_de_vencimiento, 
            trailer_id
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
        const res = await Database.table('documentos_trailers').where('id', id).delete()

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

module.exports = DocumentosTrailerController