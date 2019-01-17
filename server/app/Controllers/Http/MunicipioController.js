'use strict'
const Municipio = use('App/Models/Municipio');
const Database = use('Database')

class MunicipioController {
     //READ
     async get_all_municipios({ params }){
        return await Municipio.all()
    }

    async get_municipio({ params }){
        const { id } = params;
        return await Municipio.query()
        .where('id', id).fetch()
    }
    //CREATE
    async create_municipio({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const {
            codigo_dane,
            nombre_municipio,
            departamento,
        } = request.all()

        await Municipio.create({
            codigo_dane,
            nombre_municipio,
            departamento,
        })

        return {
            message: 'success'
        }

    }

    async update_municipio({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params;
        const municipio = await Municipio.find(id)
        const {
            codigo_municipio,
            nombre_municipio,
        } = request.all()

        municipio.codigo_municipio = codigo_municipio
        municipio.nombre_municipio = nombre_municipio
        municipio.save()

        return municipio

    }

     //DELETE
     async delete_municipio({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const municipio = await Municipio.find(id)
        return municipio.delete()
    }




}

module.exports = MunicipioController
