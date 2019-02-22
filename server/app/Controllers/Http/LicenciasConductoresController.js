'use strict'
const Database = use('Database')


class LicenciasConductoresController {
   
    async get_licencias_list({ params }){
        const { conductor_id } = params
        const res = await Database.from('licencias_conductores').where('conductor_id', conductor_id)
       
        return res
    }
    async get_licencia({ params }){
        const { id } = params
        return await Database.from('licencias_conductores').where('id', id)
    }
    async create_licencia({ request }){
        const { 
           conductor_id,
           numero_de_licencia,
           categoria,
           fecha_de_vencimiento
        } = request.all()
        const licenciaCheck = await Database.from('licencias_conductores').where({
            numero_de_licencia,
        })

        if(licenciaCheck.length == 0){
            const res = await Database.table('licencias_conductores').insert({
                conductor_id,
                numero_de_licencia,
                categoria,
                fecha_de_vencimiento
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
                message: 'Ya existe un registro con el numero de licencia '+numero_de_licencia+' para este conductor.'
            }
        }
        
        
    }
    async update_licencia({ params, request }){
        const { 
           numero_de_licencia,
           categoria,
           fecha_de_vencimiento
        } = request.all()
        const { id } = params
        const res = await Database.table('licencias_conductores').where('id', id)
        .update({
           numero_de_licencia,
           categoria,
           fecha_de_vencimiento
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

    async delete_licencia({ params }){
        const { id } = params
        const res = await Database.table('licencias_conductores').where('id', id).delete()

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

module.exports = LicenciasConductoresController