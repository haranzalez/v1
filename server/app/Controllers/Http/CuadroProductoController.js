'use strict'
const CuadreProducto = use('App/Models/CuadreProducto')
class CuadroProductoController {

    async get_all_cuadres(){
        return await CuadreProducto.all()
    }
    async get_cuadre({ params }){
        const { id } = params;
        return await CuadreProducto.query()
        .where('id', id).fetch()
    }
    async create_cuadre({ request }){
        const {
            consolidacion_id,
            producto_id,
            precio,
        } = request.all()
        
        const cuadre = await CuadreProducto.create({
            consolidacion_id,
            precio,
        })
        if(producto_id){
            await cuadre.producto().attach(producto_id)
            cuadre.producto = await cuadre.producto().fetch()
        }
        return cuadre
    }
    async update_cuadre({ params, request }){
        const { id } = params;
        const cuadre = await CuadreProducto.find(id)
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

module.exports = CuadroProductoController
