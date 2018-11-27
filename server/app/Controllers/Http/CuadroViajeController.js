'use strict'
const CuadreViaje = use('App/Models/CuadreViaje')
const Cliente = use('App/Models/Cliente')
const Ruta = use('App/Models/Ruta')
class CuadroViajeController {
    async get_all_cuadres(){
        const cuadre = await CuadreViaje.query()
        .with('vehiculo')
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
            delete cuadre.rows[prop].$relations.vehiculo.rows[0].$relations['pivot'];
            delete cuadre.rows[prop].$relations.vehiculo.rows[0].$attributes.created_at;
            delete cuadre.rows[prop].$relations.vehiculo.rows[0].$attributes.updated_at;
           
        }
        
        return cuadre
    }
    async get_cuadre({ params }){
        const { id } = params;
        const cuadre = await CuadreViaje.find(id)
        const ruta = await cuadre.ruta().with('municipios').fetch()
        const vehiculo = await cuadre.vehiculo().fetch()
        
        cuadre['placa_vehiculo'] = (vehiculo.rows.length > 0)?vehiculo.rows[0].placa:'';
        cuadre['vehiculo_id'] = (vehiculo.rows.length > 0)?vehiculo.rows[0].id:null;
        cuadre['valor_flete'] =  (ruta.rows.length > 0)?ruta.rows[0].valor_flete:0;
        cuadre['ruta_id'] = (ruta.rows.length > 0)?ruta.rows[0].id:null;
        cuadre['ruta'] = (ruta.rows.length > 0)?ruta.rows[0].$relations.municipios.rows[0].nombre_municipio + ' - ' + ruta.rows[0].$relations.municipios.rows[1].nombre_municipio:'';
       
        return cuadre
    }
    async create_cuadre({ request }){
        let {
            cliente_id,
            flete,
            ruta_id,
            anticipo,
            vehiculo_id,
            ajuste,
            debe
        } = request.all()
        const cuadre = await CuadreViaje.create({
            cliente_id,
            flete,
            anticipo,
            ajuste,
            debe
        })
        if(vehiculo_id){
            await cuadre.vehiculo().attach(vehiculo_id)
        }
        if(ruta_id){
            await cuadre.ruta().attach(ruta_id)
        }
        return {
            message: 'success'
        }
    }
    async update_cuadre({ params, request }){
        const { id } = params;
        //Get request variables
        let {
            cliente_id,
            flete,
            ruta_id,
            anticipo,
            vehiculo_id,
            ajuste,
            debe
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
        cuadre.anticipo = anticipo
        cuadre.ajuste = ajuste
        cuadre.debe = debe
        if(ruta_id){
            const rut = await cuadre.ruta().fetch()
            if(rut.rows.length > 0){
                await cuadre.ruta().detach([rut.rows[0]['id']])
            }
            await cuadre.ruta().attach(ruta_id)
        }
        if(vehiculo_id){
            const veh = await cuadre.vehiculo().fetch()
            if(veh.rows.length > 0){
                await cuadre.ruta().detach([veh.rows[0]['id']])
            }
            await cuadre.vehiculo().attach(vehiculo_id)
        }
        cuadre.save()

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
    async delete_cuadre({ params }){
        const { id } = params
        const cuadre = await CuadreViaje.find(id)
        return cuadre.delete()
    }
}
module.exports = CuadroViajeController
