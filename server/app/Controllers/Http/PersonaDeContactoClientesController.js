'use strict'
const Database = use('Database')


class PersonaDeContactoClientesController {
   
    async get_contactos_list({ params }){
        const { cliente_id } = params
        const res = await Database.from('personas_de_contacto_clientes').where('cliente_id', cliente_id)
        return res
    }
    async get_contacto({ params }){
        const { id } = params
        return await Database.from('personas_de_contacto_clientes').where('id', id)
    }
    async create_contacto({ request }){
        const { 
            nombre,
            celular,
            cargo,
            cliente_id 
        } = request.all()
        const duplicateCheck = await Database.from('personas_de_contacto_clientes').where({
            cliente_id,
            nombre,
            celular,
        })

        if(duplicateCheck.length == 0){
            const res = await Database.table('personas_de_contacto_clientes').insert({
                nombre,
                celular,
                cargo,
                cliente_id
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
                message: 'Ya existe un contacto con el nombre '+nombre+' y/o el celular '+celular+' para este cliente.'
            }
        }
        
        
    }
    async update_contacto({ params, request }){
        const { 
            nombre,
            celular,
            cargo,
        } = request.all()
        const { id } = params
        const res = await Database.table('personas_de_contacto_clientes').where('id', id)
        .update({
            nombre,
            celular,
            cargo, 
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

    async delete_contacto({ params }){
        const { id } = params
        const res = await Database.table('personas_de_contacto_clientes').where('id', id).delete()

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

module.exports = PersonaDeContactoClientesController