'use strict'
const Municipio = use('App/Models/Municipio');

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
    async create_municipio({ request }){
        const {
            codigo_municipio,
            nombre_municipio,
        } = request.all()

        return await Municipio.create({
            codigo_municipio,
            nombre_municipio
        })

    }

    async update_municipio({ request, params }){
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
     async delete_municipio({ params }){
        const { id } = params
        const municipio = await Municipio.find(id)
        return municipio.delete()
    }




}

module.exports = MunicipioController
