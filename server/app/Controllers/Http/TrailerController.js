'use strict'
const Trailer = use('App/Models/Trailer');
const Database = use('Database')

class TrailerController {

    

    //READ
    async get_all_trailers({ params }){
        return await Trailer.all()
    }

    async get_trailer({ params }){
        const { id } = params;
        return await Trailer.query()
        .where('id', id).fetch()
    }
    
    //CREATE
    async create_trailer({ request }){
        const {
            placa,
            tipo_de_vehiculo,
            tipo_de_configuracion,
            tenedor,
            modelo,
            propietario,
            tipo_de_flota,
            poseedor,
            color,
            marca_trailer,
            peso,
            tipo_carroceria,
            estado,
            radica_rndc
        } = request.all()

        return await Trailer.create({
            placa,
            tipo_de_vehiculo,
            tipo_de_configuracion,
            tenedor,
            modelo,
            propietario,
            tipo_de_flota,
            poseedor,
            color,
            marca_trailer,
            peso,
            tipo_carroceria,
            estado,
            radica_rndc
        })

    }
    //UPDATE
    async update_trailer({ request, params }){
        const { id } = params;
        const trailer = await Trailer.find(id)
        const {
            placa,
            tipo_de_vehiculo,
            tipo_de_configuracion,
            tenedor,
            modelo,
            propietario,
            tipo_de_flota,
            poseedor,
            color,
            marca_trailer,
            peso,
            tipo_carroceria,
            estado,
            radica_rndc
        } = request.all()

        trailer.placa = placa
        trailer.tipo_de_vehiculo = tipo_de_vehiculo
        trailer.tipo_de_configuracion = tipo_de_configuracion
        trailer.tenedor = tenedor
        trailer.modelo = modelo
        trailer.propietario = propietario
        trailer.tipo_de_flota = tipo_de_flota
        trailer.poseedor = poseedor
        trailer.color = color
        trailer.marca_trailer = marca_trailer
        trailer.peso = peso
        trailer.tipo_carroceria = tipo_carroceria
        trailer.estado = estado
        trailer.radica_rndc = radica_rndc
        trailer.save()

        return trailer

    }

     //DELETE
     async delete_trailer({ params }){
        const { id } = params
        const trailer = await Trailer.find(id)
        return trailer.delete()
    }
}

module.exports = TrailerController
