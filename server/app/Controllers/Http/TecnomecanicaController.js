'use strict'
const Database = use('Database')


class TecnomacanicaVehiculoController {
   
    async get_tecnomecanica_list({ params }){
        const { vehiculo_id } = params
        const res = await Database.from('tecnomcanicas_vehiculos').where('vehiculo_id', vehiculo_id)
        return res
    }
    async get_tecnomecanica({ params }){
        const { id } = params
        return await Database.from('tecnomcanicas_vehiculos').where('id', id)
    }
    async create_tecnomecanica({ request }){
        const { 
            numero_tecnomecanica,
            fecha_de_vencimiento,
            centro_de_diagnostico,
            fecha_de_expedicion,
            vehiculo_id,
        } = request.all()
        const tecnoComparison = await Database.from('tecnomcanicas_vehiculos').where({
            vehiculo_id,
            numero_tecnomecanica
        })

        if(tecnoComparison.length == 0){
            const res = await Database.table('tecnomcanicas_vehiculos').insert({
                numero_tecnomecanica,
                centro_de_diagnostico,
                fecha_de_expedicion,
                fecha_de_vencimiento,
                vehiculo_id,
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
                message: 'Ya existe un registro con el numero de tecnicomecanica '+numero_tecnomecanica+' para este vehiculo.'
            }
        }
        
        
    }
    async update_tecnomecanica({ params, request }){
        const { 
            numero_tecnomecanica,
            fecha_de_vencimiento,
            centro_de_diagnostico,
            fecha_de_expedicion,
            vehiculo_id, 
        } = request.all()
        const { id } = params
        const res = await Database.table('tecnomcanicas_vehiculos').where('id', id)
        .update({
            numero_tecnomecanica,
            fecha_de_vencimiento,
            centro_de_diagnostico,
            fecha_de_expedicion,
            vehiculo_id,
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
        const res = await Database.table('tecnomcanicas_vehiculos').where('id', id).delete()

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

module.exports = TecnomacanicaVehiculoController