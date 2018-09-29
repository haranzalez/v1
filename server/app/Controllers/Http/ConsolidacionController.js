'use strict'
const Consolidacion = use('App/Models/Consolidacion')
const CuadreProducto = use('App/Models/CuadreProducto')
const CuadreViaje = use('App/Models/CuadreViaje')
class ConsolidacionController {
     //READ
     async get_all_consolidaciones({ params }){
        return await Consolidacion.query()
        .with('cuadre_viaje.ruta')
        .with('cuadre_producto.producto').fetch()
    }

    async get_consolidacion({ params }){
        const { id } = params;
        return await Consolidacion.query()
        .where('id', id).fetch()
    }

    async create_consolidacion({ params }){
        const { cliente_id } = params
        const consolidacion = await Consolidacion.create({
            cliente_id
        })
        consolidacion.cliente = await consolidacion.cliente().fetch()
        return consolidacion
    }
    async add_viaje({ params }){
        const { consolidacion_id, cuadre_viaje_id } = params
        const consolidacion = await Consolidacion.find(consolidacion_id)
        const cuadreViaje = await CuadreViaje.find(cuadre_viaje_id)
        cuadreViaje.consolidacion_id = consolidacion_id
        cuadreViaje.save()
        consolidacion.cuadre_viaje = await consolidacion.cuadre_viaje().fetch()
        return consolidacion
    }
    async add_producto({ params }){
        const { consolidacion_id, cuadre_producto_id } = params
        const cuadreProducto = await CuadreProducto.find(cuadre_producto_id)
        const consolidacion = await Consolidacion.find(consolidacion_id)
        cuadreProducto.consolidacion_id = consolidacion_id
        cuadreProducto.save()
        consolidacion.cuadre_producto = await consolidacion.cuadre_producto().fetch()
        return consolidacion
    }
    //UPDATE
    async update_consolidacion({ request, params }){
        const { id } = params;
        const consolidacion = await Consolidacion.find(id)
        const {
            
        } = request.all()

        
        consolidacion.save()

        return consolidacion

    }

     //DELETE
     async delete_consolidacion({ params }){
        const { id } = params
        const consolidacion = await Consolidacion.find(id)
        return consolidacion.delete()
    }
}

module.exports = ConsolidacionController
