'use strict'

const Vehiculo = use('App/Models/Vehiculo');
const Database = use('Database')
const Conductor = use('App/Models/Conductore');
const Trailer = use('App/Models/Trailer');

class VehiculoController {

    async assign_conductor({ params }){
        const { conductor_id, vehiculo_id } = params
        const check = await Conductor.query().where('vehiculo_id', vehiculo_id).fetch()
        const vehicleCheck = await Vehiculo.query()
        .with('trailer')
        .with('conductor')
        .where('id', vehiculo_id).fetch()

        if(check !== null){
            await Conductor.query().where('vehiculo_id', vehiculo_id).update({
                vehiculo_id: null
            })
        }
        const conductor = await Conductor.find(conductor_id)
        if(conductor.vehiculo_id !== null){
            await Vehiculo.query().where('id', conductor.vehiculo_id).update({
                estado: 'en espera'
            })
        }
        
        conductor.vehiculo_id = vehiculo_id
        conductor.save()
        let estado = (vehicleCheck.rows[0].$relations.trailer !== null) ? 'disponible' : 'en espera'
        await Vehiculo.query().where('id', vehiculo_id).update({
            estado: estado
        })
        return conductor
    }

    async assign_trailer({ params }){
        const { trailer_id, vehiculo_id } = params
        const check = await Trailer.query().where('vehiculo_id', vehiculo_id).fetch()
        const vehicleCheck = await Vehiculo.query()
        .with('trailer')
        .with('conductor')
        .where('id', vehiculo_id).fetch()
        if(check !== null){
            await Trailer.query().where('vehiculo_id', vehiculo_id).update({
                vehiculo_id: null
            })
        }
        const trailer = await Trailer.find(trailer_id)
        if(trailer.vehiculo_id !== null){
            await Vehiculo.query().where('id', trailer.vehiculo_id).update({
                estado: 'en espera'
            })
        }
        trailer.vehiculo_id = vehiculo_id
        trailer.save()
        let estado = (vehicleCheck.rows[0].$relations.conductor !== null) ? 'disponible' : 'en espera'
        await Vehiculo.query().where('id', vehiculo_id).update({
            estado: estado
        })
        return trailer
    }

    //READ
    async get_all_vehicles({ params }){
        return await Vehiculo.query()
        .with('conductor')
        .with('trailer')
        .fetch()
    }

    async get_vehicle({ params }){
        const { id } = params;
        return await Vehiculo.query()
        .with('conductor')
        .with('trailer')
        .where('id', id).fetch()
    }
    
    //CREATE
    async create_vehicle({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
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
            capasidad_carga,
            radica_rndc,
            transportadora_id,
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
            capasidad_carga,
            radica_rndc,
            transportadora_id,
            estado: 'en espera'
        })

    }

    //UPDATE
    async update_vehicle({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
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
            capasidad_carga,
            radica_rndc,
            transportadora_id,
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
        vehiculo.radica_rndc = radica_rndc
        vehiculo.transportadora_id = transportadora_id
        vehiculo.save()

        return vehiculo

    }

     //DELETE
     async delete_vehiculo({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const vehiculo = await Vehiculo.find(id)
        return vehiculo.delete()
    }
}

module.exports = VehiculoController
