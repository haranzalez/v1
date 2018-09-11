'use strict'

const Conductor = use('App/Models/Conductore');
const Database = use('Database')

class ConductorController {

    

    async get_all_conductores({ params }){
        return await Conductor.all()
    }

    async get_conductor({ params }){
        const { id } = params;
        return await Conductor.query()
        .with('datos_bancarios')
        .with('licencias')
        .where('id', id).fetch()
    }
    
    //CREATE
    async create_conductor({ request }){
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
            transportadora
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
            transportadora
        })

    }

    async create_licence({ request, params }){
        const { id } = params
        const {
            numero_de_licencia,
            categoria,
            fecha_de_vencimiento
        } = request.all()

        return await Database.table('licencias_conductores')
        .insert({
            conductore_id: id,
            numero_de_licencia,
            categoria,
            fecha_de_vencimiento
        })

    }

    async create_bank_account({ request, params }){
        const { id } = params;
        const {
            titular,
            tipo_de_id,
            numero_cuenta,
            tipo_cuenta,
            banco,
            cuenta_propia,
            radica_rndc
        } = request.all();
        
        return await Database.table('datos_bancarios_conductores')
        .insert({
            conductore_id: id,
            titular,
            tipo_de_id,
            numero_cuenta,
            tipo_cuenta,
            banco,
            cuenta_propia,
            radica_rndc
        });
    }
    
    //UPDATE
    async update_conductor({ request, params }){
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
            transportadora
        } = request.all()

        conductor.codigo = codigo,
        conductor.tipo_de_identificacion = tipo_de_identificacion,
        conductor.cedula = cedula,
        conductor.municipio_documento = municipio_documento,
        conductor.nombres = nombres,
        conductor.primer_apellido = primer_apellido,
        conductor.segundo_apellido = segundo_apellido,
        conductor.tipo_de_conductor = tipo_de_conductor,
        conductor.direccion = direccion,
        conductor.municipio = municipio,
        conductor.telefono_1 = telefono_1,
        conductor.telefono_2 = telefono_2,
        conductor.celular = celular,
        conductor.transportadora = transportadora
        conductor.save()
        return conductor

    }

    async update_conductor_licence({ request, params }){
        const { id } = params;
        const licence = await Database.table('licencias_conductores')
        .query().where('conductore_id', id).fetch()
        const {
            numero_de_licencia,
            categoria,
            fecha_de_vencimiento
        } = request.all()

        licence.numero_de_licencia = numero_de_licencia
        licence.categoria = categoria
        licence.fecha_de_vencimiento = fecha_de_vencimiento
        licence.save()
        return licence

    }

    

    async update_conductor_bank_account({ request, params }){
        const { id } = params;
        const {
            titular,
            tipo_de_id,
            numero_cuenta,
            tipo_cuenta,
            banco,
            cuenta_propia,
            radica_rndc
        } = request.all();
        const bank = await Database.table('datos_bancarios_conductores')
        .query().where('conductore_id', id).fetch()

        bank.titular = titular
        bank.tipo_de_id = tipo_de_id
        bank.numero_cuenta = numero_cuenta
        bank.tipo_cuenta = tipo_cuenta
        bank.banco = banco
        bank.cuenta_propia = cuenta_propia
        bank.radica_rndc = radica_rndc    
        bank.save()
        return bank    
    }
    
    //DELETE
    async delete_conductor({ params }){
        const { id } = params
        const conductor = await Conductor.find(id)
        return conductor.delete()

    }
    async delete_conductor_licence({ params }){
        const { id } = params
        const licence = await Database.table('licencias_conductores')
        .query().where('id', id)
        return licence.delete()
    }
    async delete_conductor_bank_account({ params }){
        const { id } = params
        const bank = await Database.table('datos_bancarios_conductores')
        .query().where('id', id)
        return bank.delete()

    }

}

module.exports = ConductorController
