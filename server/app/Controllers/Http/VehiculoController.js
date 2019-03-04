'use strict'

const Vehiculo = use('App/Models/Vehiculo');
const Database = use('Database')
const Conductor = use('App/Models/Conductore');
const Trailer = use('App/Models/Trailer');

class VehiculoController {
    async get_marcas_vehiculos({ request }){
        const { keyword } = request.all()
        var keytrans = keyword.toUpperCase()
        const res = await Database.raw("SELECT * FROM marcas_vehiculos WHERE descripcion LIKE '"+keytrans+"%'")
        return res.rows
    }
    async get_colores_vehiculos({ request }){
        const { keyword } = request.all()
        var keytrans = keyword.toUpperCase()
        const res = await Database.raw("SELECT * FROM colores_vehiculos WHERE nombrecolor LIKE '"+keytrans+"%'")
        return res.rows
    }
    async get_lineas_vehiculos({ request }){
        const { keyword } = request.all()
        var keytrans = keyword.toUpperCase()
        const res = await Database.raw("SELECT * FROM linea_vehiculos WHERE descripcion LIKE '"+keytrans+"%'")
        return res.rows
    }
    async get_tipo_carroceria({ request }){
        const { keyword } = request.all()
        var keytrans = keyword.toUpperCase()
        const res = await Database.raw("SELECT * FROM tipo_de_carroceria WHERE descripcion LIKE '"+keytrans+"%'")
        return res.rows
    }
    async assign_conductor({ params }){
        const { conductor_id, vehiculo_id } = params
        if(conductor_id == 'null'){
            return;
        }
        const check = await Conductor.query().where('vehiculo_id', vehiculo_id).fetch()
        
        if(check !== null){
            await Conductor.query().where('vehiculo_id', vehiculo_id).update({
                vehiculo_id: null
            })
        }
        const conductor = await Conductor.find(conductor_id)
        conductor.vehiculo_id = vehiculo_id
        conductor.save()
        return {
            message: 'success'
        }
    }

    async assign_trailer({ params }){
        const { trailer_id, vehiculo_id } = params
        console.log(trailer_id)
        if(trailer_id == 'null'){
            return;
        }
        const check = await Trailer.query().where('vehiculo_id', vehiculo_id).fetch()
       
        if(check !== null){
            await Trailer.query().where('vehiculo_id', vehiculo_id).update({
                vehiculo_id: null
            })
        }
        const trailer = await Trailer.find(trailer_id)
        
        trailer.vehiculo_id = vehiculo_id
        trailer.save()
        return {
            message: 'success'
        }
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
            tipo_de_carroceria,
            digito_de_verificacion_tenedor,
            digito_de_verificacion_propietario,
            tipo_de_id_tenedor,
            tipo_de_id_propietario,
            numero_de_ejes,
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
            estado,
            propietario,
            tenedor,
            cedula_propietario,
            cedula_tenedor,
        } = request.all()

        await Vehiculo.create({
            placa,
            numero_chasis,
            tipo_de_vehiculo,
            tipo_configuracion,
            tipo_de_carroceria,
            digito_de_verificacion_tenedor,
            digito_de_verificacion_propietario,
            tipo_de_id_tenedor,
            tipo_de_id_propietario,
            numero_de_ejes,
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
            estado,
            propietario,
            tenedor,
            cedula_propietario,
            cedula_tenedor,
        })

        return {
            message: 'success'
        }

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
            tipo_de_carroceria,
            digito_de_verificacion_tenedor,
            digito_de_verificacion_propietario,
            tipo_de_id_tenedor,
            tipo_de_id_propietario,
            numero_de_ejes,
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
            estado,
            propietario,
            tenedor,
            cedula_propietario,
            cedula_tenedor,
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
        vehiculo.estado = estado
        vehiculo.propietario = propietario
        vehiculo.tenedor = tenedor
        vehiculo.cedula_propietario = cedula_propietario
        vehiculo.cedula_tenedor = cedula_tenedor
        vehiculo.tipo_de_carroceria = tipo_de_carroceria
        vehiculo.numero_de_ejes = numero_de_ejes
        vehiculo.digito_de_verificacion_tenedor = digito_de_verificacion_tenedor
        vehiculo.digito_de_verificacion_propietario = digito_de_verificacion_propietario
        vehiculo.tipo_de_id_tenedor = tipo_de_id_tenedor
        vehiculo.tipo_de_id_propietario = tipo_de_id_propietario
        vehiculo.save()

        return {
            message: 'success'
        }

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
