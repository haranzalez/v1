'use strict'
const CuadreViaje = use('App/Models/CuadreViaje')
const Consolidacion = use('App/Models/Consolidacion')
class CuadroViajeController {
    async get_all_cuadres(){
        return await CuadreViaje.all()
    }
    async get_cuadre({ params }){
        const { id } = params;
        return await CuadreViaje.query()
        .where('id', id).fetch()
    }
    async create_cuadre({ request }){
        const consolidacion = await consolidacion.find(consolidacion_id)
        const {
            consolidacion_id,
            flete,
            ruta_id,
            vehiculo_id,
        } = request.all()
        const consolidacion = await Consolidacion.find(consolidacion_id)
        
        const cuadre = await CuadreViaje.create({
            consolidacion_id,
            flete,
        })
        if(vehiculo_id){
            await cuadre.vehiculo().attach(vehiculo_id)
            cuadre.vehiculo = await cuadre.vehiculo().fetch()
        }
        if(ruta_id){
            await cuadre.ruta().attach(ruta_id)
            cuadre.ruta = await cuadre.ruta().fetch()
        }
        return cuadre
    }
    async update_cuadre({ params, request }){
        const { id } = params;
        const cuadre = await CuadreViaje.find(id)
        const {
            consolidacion_id,
            producto_id,
            precio,
        } = request.all()
        
        cuadre.consolidacion_id = consolidacion_id
        cuadre.precio = consolidacion_id
        cuadre.save()
        if(producto_id){
            await cuadre.producto().attach(producto_id)
            cuadre.producto = await cuadre.producto().fetch()
        }
        return cuadre
    }
    //DELETE
    async delete_cuadre({ params }){
        const { id } = params
        const cuadre = await CuadreProducto.find(id)
        return cuadre.delete()
    }
}

module.exports = CuadroViajeController
