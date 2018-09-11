'use strict'

const Vehiculo = use('App/Models/Vehiculo');
const Database = use('Database')
const Conductor = use('App/Models/Conductore');
const Trailer = use('App/Models/Trailer');

class VehiculoController {

    async assign_conductor({ params }){
        const { conductor_id, vehiculo_id } = params
        const conductor = await Conductor.find(conductor_id)
        conductor.vehiculo_id = vehiculo_id
        conductor.save()
        return conductor
    }

    async assign_trailer({ params }){
        const { trailer_id, vehiculo_id } = params
        const trailer = await Trailer.find(trailer_id)
        trailer.vehiculo_id = vehiculo_id
        trailer.save()
        return trailer
    }

    //READ
    async get_all_vehicles({ params }){
        return await Vehiculo.all()
    }

    async get_vehicle({ params }){
        const { id } = params;
        return await Vehiculo.query()
        .with('conductor')
        .with('trailer')
        .where('id', id).fetch()
    }
    
    //CREATE
    async create_vehicle({ request }){
        const {
            placa,
            numero_chasis,
            tipo_de_vehiculo,
            tipo_configuracion,
            modelo,
            numero_motor,
            tipo_de_flota,
            marca_cabezote,
            linea_cabezote,
            tipo_de_combustible,
            color,
            peso,
            capasidad_carga
        } = request.all()

        return await Vehiculo.create({
            placa,
            numero_chasis,
            tipo_de_vehiculo,
            tipo_configuracion,
            modelo,
            numero_motor,
            tipo_de_flota,
            marca_cabezote,
            linea_cabezote,
            tipo_de_combustible,
            color,
            peso,
            capasidad_carga
        })

    }

    //UPDATE
    async update_vehicle({ request, params }){
        const { id } = params;
        const vehiculo = await Vehiculo.find(id)
        const {
            placa,
            numero_chasis,
            tipo_de_vehiculo,
            tipo_configuracion,
            modelo,
            numero_motor,
            tipo_de_flota,
            marca_cabezote,
            linea_cabezote,
            tipo_de_combustible,
            color,
            peso,
            capasidad_carga
        } = request.all()

        vehiculo.placa = placa
        vehiculo.numero_chasis = numero_chasis
        vehiculo.tipo_de_vehiculo = tipo_de_vehiculo
        vehiculo.tipo_configuracion = tipo_configuracion
        vehiculo.modelo = modelo
        vehiculo.numero_motor = numero_motor
        vehiculo.tipo_de_flota = tipo_de_flota
        vehiculo.marca_cabezote = marca_cabezote
        vehiculo.linea_cabezote = linea_cabezote
        vehiculo.tipo_de_combustible = tipo_de_combustible
        vehiculo.color = color
        vehiculo.peso = peso
        vehiculo.capasidad_carga = capasidad_carga
        vehiculo.save()

        return vehiculo

    }

     //DELETE
     async delete_vehiculo({ params }){
        const { id } = params
        const vehiculo = await Vehiculo.find(id)
        return vehiculo.delete()
    }
}

module.exports = VehiculoController
