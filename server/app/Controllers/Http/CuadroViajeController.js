'use strict'
const CuadreViaje = use('App/Models/CuadreViaje')
const Consolidacion = use('App/Models/Consolidacion')
const Ruta = use('App/Models/Ruta')
class CuadroViajeController {
    async get_all_cuadres(){
        const cuadre = await CuadreViaje.query()
        .with('vehiculo')
        .with('ruta.municipios')
        .with('consolidacion')
        .fetch()

        for(let prop in cuadre.rows){
            let consolidacion = await Consolidacion.find(cuadre.rows[prop]['consolidacion_id'])
            let cliente = await consolidacion.cliente().fetch()
            cuadre.rows[prop]['nombre_cliente'] = cliente.nombre_razon_social
        }
        
        return cuadre
    }
    async get_cuadre({ params }){
        const { id } = params;
        return await CuadreViaje.query()
        .where('id', id).fetch()
    }
    async create_cuadre({ request }){
        let {
            consolidacion_id,
            flete,
            ruta_id,
            anticipo,
            vehiculo_id,
        } = request.all()
        const consolidacion = await Consolidacion.find(consolidacion_id)
        const existing_cuadre = await consolidacion.cuadre_viaje().fetch()
        
        if(existing_cuadre !== null){
            return {
                message: 'Ya existe un cuadre para esta consolidacion'
            }
        }

        const ruta = await Ruta.find(ruta_id)
        //descuento
        const porcentaje_descuento =  flete / ruta.valor_flete
        const descuento = (flete < ruta.valor_flete) ? ruta.valor_flete - (porcentaje_descuento * ruta.valor_flete) : 0
        //ganancia
        const ganancia = (flete > ruta.valor_flete) ? flete - ruta.valor_flete : 0
        //debito
        const debe = flete - anticipo


        const cuadre = await CuadreViaje.create({
            consolidacion_id,
            flete,
            anticipo,
            ganancia,
            descuento,
            debe
        })
        if(vehiculo_id){
            await cuadre.vehiculo().attach(vehiculo_id)
        }
        if(ruta_id){
            await cuadre.ruta().attach(ruta_id)
        }

        return await Consolidacion.query()
        .with('cuadre_viaje.ruta')
        .fetch()
    }
    async update_cuadre({ params, request }){
        const { id } = params;
        //Get request variables
        let {
            consolidacion_id,
            flete,
            anticipo,
            ruta_id,
            vehiculo_id,
        } = request.all()
        //find cuadre to update
        const cuadre = await CuadreViaje.find(id)//returns Object
        if(cuadre === null){
            return {
                message: 'No se pudo encontrar este cuadre en los registros'
            }
        }
        cuadre.consolidacion_id = consolidacion_id
        cuadre.flete = flete
        cuadre.anticipo = anticipo
        if(ruta_id){
            await cuadre.ruta().attach(ruta_id)
        }
        if(vehiculo_id){
            await cuadre.vehiculo().attach(vehiculo_id)
        }
        if(cuadre == null){
            return {
                message: "No se pudo encontrar este cuadre de viaje en la base de datos."
            }
        }
        const ruta = await Ruta.find(ruta_id)
        //descuento
        const porcentaje_descuento =  flete / ruta.valor_flete
        const descuento = (flete < ruta.valor_flete) ? ruta.valor_flete - (porcentaje_descuento * ruta.valor_flete) : 0
        //ganancia
        const ganancia = (flete > ruta.valor_flete) ? flete - ruta.valor_flete : 0
        
        cuadre.debe = flete - anticipo
        cuadre.ganancia = ganancia
        cuadre.descuento = descuento
        cuadre.save()

        //consolidacion
        const consolidacion = await Consolidacion.find(consolidacion_id)
        
        return await Consolidacion.query()
        .with('cuadre_viaje.ruta')
        .fetch()  
    }
    //DELETE
    async delete_cuadre({ params }){
        const { id } = params
        const cuadre = await CuadreProducto.find(id)
        return cuadre.delete()
    }
}
module.exports = CuadroViajeController
