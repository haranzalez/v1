'use strict'
const CuadreViaje = use('App/Models/CuadreViaje')
const Cliente = use('App/Models/Cliente')
const Ruta = use('App/Models/Ruta')
const Database = use('Database')
class CuadroViajeController {
    async get_all_cuadres(){
        const cuadre = await CuadreViaje.query()
        .with('ruta.municipios')
        .fetch()
        for(let prop in cuadre.rows){
            let origen = cuadre.rows[prop]['$relations']['ruta']['rows'][0]['$relations']['municipios']['rows'][0]['nombre_municipio'];
            let destino = cuadre.rows[prop]['$relations']['ruta']['rows'][0]['$relations']['municipios']['rows'][1]['nombre_municipio'];
            let cliente = await Cliente.find(cuadre.rows[prop]['cliente_id']);
            cuadre.rows[prop]['nombre_ruta'] = origen + ' - ' + destino;
            cuadre.rows[prop]['origen'] = origen;
            cuadre.rows[prop]['destino'] = destino;
            cuadre.rows[prop]['nombre_cliente'] = cliente.nombre_razon_social;
            delete cuadre.rows[prop].$relations.ruta.rows[0].$attributes.created_at;
            delete cuadre.rows[prop].$relations.ruta.rows[0].$attributes.updated_at;
            delete cuadre.rows[prop].$relations.ruta.rows[0].$relations['pivot'];
            delete cuadre.rows[prop].$relations.ruta.rows[0].$relations['municipios'];
        }
        return cuadre
    }
    async get_cuadre({ params }){
        const { id } = params;
        const cuadre = await CuadreViaje.find(id)
        const ruta = await cuadre.ruta().with('municipios').fetch()
       
        cuadre['ruta_id'] = (ruta.rows.length > 0)?ruta.rows[0].id:null;
        cuadre['ruta'] = (ruta.rows.length > 0)?ruta.rows[0].$relations.municipios.rows[0].nombre_municipio + ' - ' + ruta.rows[0].$relations.municipios.rows[1].nombre_municipio:'';
       
        return cuadre
    }
    async get_cuadres_history({request}){
        const { cliente_id, ruta_id } = request.all()
        return await Database.from('historial_precios_rutas').where({cliente_id, ruta_id})
    }
    async create_cuadre({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        let {
            cliente_id,
            flete,
            ruta_id,
            pago_conductor,
            pago_tercero,
            pago_cabezote,
            tipo_de_vehiculo,
            tipo_de_negociacion,
        } = request.all()
        const cuadre = await CuadreViaje.create({
            cliente_id,
            flete,
            pago_conductor,
            pago_tercero,
            pago_cabezote,
            tipo_de_vehiculo,
            tipo_de_negociacion,
        })
        if(ruta_id){
            await cuadre.ruta().attach(ruta_id)
        }
        //historial
        await Database.table('historial_precios_rutas')
        .insert({ 
            cliente_id,
            flete,
            ruta_id,
            pago_conductor,
            pago_tercero,
            pago_cabezote,
            tipo_de_vehiculo,
            tipo_de_negociacion,
            fecha: new Date()
        })
        return {
            message: 'success'
        }
    }
    async update_cuadre({ auth, params, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params;
        //Get request variables
        let {
            cliente_id,
            flete,
            ruta_id,
            pago_conductor,
            pago_tercero,
            pago_cabezote,
            tipo_de_vehiculo,
            tipo_de_negociacion,
        } = request.all()
        //find cuadre to update
        const cuadre = await CuadreViaje.find(id)//returns Object
        if(cuadre === null){
            return {
                message: 'No se pudo encontrar este cuadre en los registros'
            }
        }
        cuadre.cliente_id = cliente_id
        cuadre.flete = flete
        cuadre.pago_conductor = pago_conductor
        cuadre.pago_tercero = pago_tercero
        cuadre.pago_cabezote = pago_cabezote
        cuadre.tipo_de_vehiculo = tipo_de_vehiculo
        cuadre.tipo_de_negociacion = tipo_de_negociacion
        if(ruta_id){
            const rut = await cuadre.ruta().fetch()
            if(rut.rows.length > 0){
                await cuadre.ruta().detach([rut.rows[0]['id']])
            }
            await cuadre.ruta().attach(ruta_id)
        }
        cuadre.save()

        //historial
        await Database.table('historial_precios_rutas')
        .insert({ 
            cliente_id,
            flete,
            ruta_id,
            pago_conductor,
            pago_tercero,
            pago_cabezote,
            tipo_de_vehiculo,
            tipo_de_negociacion,
            fecha: new Date()
        })

       return {
           message: 'success'
       }
    }
    async assign_vehiculo({ params }){
        const { id, vehiculo_id } = params;
        const cuadre = await CuadreViaje.find(id);
        const vehiculo = await cuadre.vehiculo().fetch()
        if(vehiculo.id != vehiculo_id){
            await cuadre.vehiculo().detach(vehiculo.id)
            await cuadre.vehiculo().attach(vehiculo_id)
        }else{
            await cuadre.vehiculo().attach(vehiculo_id)
        }
        return {
            message: 'success'
        }
    }
    async assign_ruta({ params }){
        const { id, ruta_id } = params;
        const cuadre = await CuadreViaje.find(id);
        const originalRuta = await cuadre.ruta().fetch()
        const ruta = await Ruta.find(ruta_id)
        let flete = Number(ruta.valor_flete)
        let cuadre_flete = Number(cuadre.flete)
        let anticipo = Number(cuadre.anticipo)
        let ajuste = (cuadre_flete > 0 && flete > 0)?flete - cuadre_flete:0
        let debe = cuadre_flete - anticipo
        if(originalRuta.id != ruta_id){
            await cuadre.ruta().detach(originalRuta.id)
            await cuadre.ruta().attach(ruta_id)
        }else{
            await cuadre.ruta().attach(ruta_id)
        }
        cuadre.flete = cuadre_flete
        cuadre.anticipo = anticipo
        cuadre.debe = debe
        cuadre.ajuste = ajuste
        cuadre.save()
        return {
            message: 'success'
        }
    }
    //DELETE
    async delete_cuadre({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const cuadre = await CuadreViaje.find(id)
        return cuadre.delete()
    }
}
module.exports = CuadroViajeController
