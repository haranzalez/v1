'use strict'
const Database = use('Database')


class DocumentosConductoresController {
   
    async get_documentos_list({ params }){
        const { conductor_id } = params
        const res = await Database.from('documentos_conductores').where('conductor_id', conductor_id)
       
        return res
    }
    async get_documento({ params }){
        const { id } = params
        return await Database.from('documentos_conductores').where('id', id)
    }
    async create_documento({ request }){
        const { 
            institucion,
            tipo_de_documento,
            fecha_inicio,
            fecha_fin,
            conductor_id 
        } = request.all()
        const documentCheck = await Database.from('documentos_conductores').where({
            conductor_id,
            tipo_de_documento
        })

        if(documentCheck.length == 0){
            const res = await Database.table('documentos_conductores').insert({
                institucion,
                tipo_de_documento,
                fecha_inicio,
                fecha_fin,
                conductor_id 
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
                message: 'Ya existe un registro con tipo de documento '+tipo_de_documento+' para este conductor.'
            }
        }
        
        
    }
    async update_documento({ params, request }){
        const { 
            institucion,
            tipo_de_documento,
            fecha_inicio,
            fecha_fin, 
        } = request.all()
        const { id } = params
        const res = await Database.table('documentos_conductores').where('id', id)
        .update({
            institucion,
            tipo_de_documento,
            fecha_inicio,
            fecha_fin, 
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
        const res = await Database.table('documentos_conductores').where('id', id).delete()

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

module.exports = DocumentosConductoresController