'use strict'
const Trailer = use('App/Models/Trailer');
const Database = use('Database')

class TrailerController {

    

    //READ
    async get_marcas_semiremolques({ request }){
        const { keyword } = request.all()
        var keytrans = keyword.toUpperCase()
        const res = await Database.raw("SELECT * FROM marcas_semiremolques WHERE descripcion LIKE '"+keytrans+"%'")
        return res.rows
    }
    async get_all_trailers({ params }){
        return await Trailer.all()
    }

    async get_trailer({ params }){
        const { id } = params;
        return await Trailer.query()
        .where('id', id).fetch()
    }
    
    //CREATE
    async create_trailer({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const {
            placa,
            tipo_de_vehiculo,
            tipo_de_configuracion,
            tenedor,
            modelo,
            propietario,
            tipo_de_flota,
            color,
            marca_trailer,
            peso,
            tipo_carroceria,
            estado,
            radica_rndc,
            cedula_propietario,
            cedula_tenedor,
            tipo_de_id_tenedor,
            tipo_de_id_propietario,
            digito_de_verificacion_propietario,
            digito_de_verificacion_tenedor,
            transportadora_id,
        } = request.all();

        return await Trailer.create({
            placa,
            tipo_de_vehiculo,
            tipo_de_configuracion,
            tenedor,
            modelo,
            propietario,
            tipo_de_flota,
            color,
            marca_trailer,
            peso,
            tipo_carroceria,
            estado,
            radica_rndc,
            cedula_propietario,
            cedula_tenedor,
            tipo_de_id_tenedor,
            tipo_de_id_propietario,
            digito_de_verificacion_propietario,
            digito_de_verificacion_tenedor,
            transportadora_id,
        });

    }
    //UPDATE
    async update_trailer({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
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
            color,
            marca_trailer,
            peso,
            tipo_carroceria,
            estado,
            radica_rndc,
            cedula_propietario,
            cedula_tenedor,
            tipo_de_id_tenedor,
            tipo_de_id_propietario,
            digito_de_verificacion_propietario,
            digito_de_verificacion_tenedor,
            transportadora_id,
        } = request.all()

        trailer.placa = placa
        trailer.tipo_de_vehiculo = tipo_de_vehiculo
        trailer.tipo_de_configuracion = tipo_de_configuracion
        trailer.tenedor = tenedor
        trailer.modelo = modelo
        trailer.propietario = propietario
        trailer.tipo_de_flota = tipo_de_flota
        trailer.color = color
        trailer.marca_trailer = marca_trailer
        trailer.peso = peso
        trailer.tipo_carroceria = tipo_carroceria
        trailer.estado = estado
        trailer.radica_rndc = radica_rndc
        trailer.transportadora_id = transportadora_id
        trailer.cedula_propietario = cedula_propietario
        trailer.cedula_tenedor = cedula_tenedor
        trailer.tipo_de_id_tenedor = tipo_de_id_tenedor
        trailer.tipo_de_id_propietario = tipo_de_id_propietario
        trailer.digito_de_verificacion_propietario = digito_de_verificacion_propietario
        trailer.digito_de_verificacion_tenedor = digito_de_verificacion_tenedor
        trailer.save()
        return trailer
    }

     //DELETE
     async delete_trailer({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const trailer = await Trailer.find(id)
        return trailer.delete()
    }
}

module.exports = TrailerController
