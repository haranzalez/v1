'use strict'
const Database = use('Database')


class AseguradorasController {
   
    async get_aseguradoras_list(){
        return await Database.select('*').from('aseguradoras')
    }
    async get_aseguradora({ params }){
        const { id } = params
        return await Database.from('aseguradoras').where('id', id)
    }
    async create_aseguradora({ request }){
        const { nit, nombre } = request.all()
        const res = await Database.table('aseguradoras').insert({nit, nombre})

        if(res){
            return {
                message: 'success'
            }
        }
        return {
            message: 'fail'
        }
        
    }
    async update_aseguradora({ params, request }){
        const { nit, nombre } = request.all()
        const { id } = params
        const res = await Database.table('aseguradoras').where('id', id).update({nit, nombre})

        if(res){
            return {
                message: 'success'
            }
        }
        return {
            message: 'fail'
        }
        
    }

    async delete_aseguradora({ params }){
        const { id } = params
        const res = await Database.table('aseguradoras').where('id', id).delete()

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

module.exports = AseguradorasController