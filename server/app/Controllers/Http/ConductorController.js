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
    async create_datos_bancarios({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const {
            titular,
            tipo_de_id,
            numero_cuenta_bancaria,
            tipo_cuenta_bancaria,
            banco,
            cuenta_propia,
            radica_rndc
        } = request.all()
        var res = await Database
        .table('datos_bancarios_conductores')
        .insert({
            conductor_id: id,
            titular,
            tipo_de_id,
            numero_cuenta_bancaria,
            tipo_cuenta_bancaria,
            banco,
            cuenta_propia,
            radica_rndc
        })
        console.log(res)
        return {
            message: 'success'
        }

    }
    async update_datos_bancarios({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        var res = await Database
        .table('datos_bancarios_conductores')
        .where('conductor_id', id)
        .update({
          titular,
          tipo_de_id,
          numero_cuenta_bancaria,
          tipo_cuenta_bancaria,
          banco,
          cuenta_propia,
          radica_rndc
        } = request.all())
        console.log(res)
        return {
            message: 'success'
        }

    }
    async get_datos_bancarios({ request, params}){
        const { id } = params
        return await Database.from('datos_bancarios_conductores').where('conductor_id', id)
    }
    async get_licencias({ request, params}){
        const { id } = params
        return await Database.from('licencias_conductores').where('conductor_id', id)
    }

    async create_licence({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const {
            numero_de_licencia,
            categoria,
            fecha_de_vencimiento
        } = request.all()

        await Database.table('licencias_conductores')
        .insert({
            conductor_id: id,
            numero_de_licencia,
            categoria,
            fecha_de_vencimiento
        })
        return {
            message: 'success'
        }

    }

    async update_licence({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const {
            numero_de_licencia,
            categoria,
            fecha_de_vencimiento
        } = request.all()

        var res = await Database.table('licencias_conductores').where('id', id)
        .update({
            numero_de_licencia,
            categoria,
            fecha_de_vencimiento
        })
        if(res){
            return {
                message: 'success'
            }
        }

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
    async delete_conductor_licence({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const licence = await Database.table('licencias_conductores')
        .query().where('id', id)
        return licence.delete()
    }
    async delete_conductor_bank_account({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const bank = await Database.table('datos_bancarios_conductores')
        .query().where('id', id)
        return bank.delete()

    }

}

module.exports = ConductorController
