'use strict'

const Conductor = use('App/Models/Conductore');
const Database = use('Database')

class ConductorController {
    async get_all_conductores({ params }){
        return await Conductor.all()
    }

    async get_conductor({ params }){
        const { id } = params;
        return await Conductor.find(id)
    }
    
    //CREATE
    async create_conductor({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const {
            codigo,
            tipo_de_identificacion,
            cedula,
            municipio_documento,
            nombres,
            primer_apellido,
            segundo_apellido,
            tipo_de_conductor,
            direccion,
            municipio,
            telefono_1,
            telefono_2,
            celular,
            transportadora_id,
            radica_rndc,
            estado,
        } = request.all()

        return await Conductor.create({
            codigo,
            tipo_de_identificacion,
            cedula,
            municipio_documento,
            nombres,
            primer_apellido,
            segundo_apellido,
            tipo_de_conductor,
            direccion,
            municipio,
            telefono_1,
            telefono_2,
            celular,
            transportadora_id,
            radica_rndc,
            estado,
        })

    }
    //UPDATE
    async update_conductor({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params;
        const conductor = await Conductor.find(id)
        const {
            codigo,
            tipo_de_identificacion,
            cedula,
            municipio_documento,
            nombres,
            primer_apellido,
            segundo_apellido,
            tipo_de_conductor,
            direccion,
            municipio,
            telefono_1,
            telefono_2,
            celular,
            transportadora_id,
            radica_rndc,
            estado,
        } = request.all()

        conductor.codigo = codigo
        conductor.tipo_de_identificacion = tipo_de_identificacion
        conductor.cedula = cedula,
        conductor.municipio_documento = municipio_documento
        conductor.nombres = nombres
        conductor.primer_apellido = primer_apellido
        conductor.segundo_apellido = segundo_apellido
        conductor.tipo_de_conductor = tipo_de_conductor
        conductor.direccion = direccion
        conductor.municipio = municipio
        conductor.telefono_1 = telefono_1
        conductor.telefono_2 = telefono_2
        conductor.celular = celular
        conductor.transportadora_id = transportadora_id
        conductor.radica_rndc = radica_rndc
        conductor.estado = estado
        conductor.save()
        return conductor

    }
    //DELETE
    async delete_conductor({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const conductor = await Conductor.find(id)
        return conductor.delete()

    }
    

}

module.exports = ConductorController
