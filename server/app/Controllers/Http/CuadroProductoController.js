'use strict'
const CuadreProducto = use('App/Models/CuadreProducto')
const Consolidacion = use('App/Models/Consolidacion')
const Producto = use('App/Models/Producto')
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
        const consolidacion = await Consolidacion.find(consolidacion_id)
        const existing_cuadre = await consolidacion.cuadre_producto().fetch()
        
        if(existing_cuadre !== null){
            return {
                message: 'Ya existe un cuadre para esta consolidacion'
            }
        }

        const producto = await Producto.find(producto_id)
        //descuento
        const porcentaje_descuento =  precio / producto.precio
        const descuento = (precio < producto.precio) ? producto.precio - (porcentaje_descuento * producto.precio) : 0
        //ganancia
        const ganancia = (precio > producto.precio) ? precio - producto.precio : 0
       


        const cuadre = await CuadreProducto.create({
            consolidacion_id,
            precio,
            ganancia,
            descuento,
        })
        if(producto_id){
            await cuadre.producto().attach(producto_id)
        }

        return await Consolidacion.query()
        .with('cuadre_producto.producto')
        .fetch()
        
       
    }
    async update_cuadre({ params, request }){
        const { id } = params;
        //find cuadre to update
        const cuadre = await CuadreProducto.find(id)//returns Object
        if(cuadre == null){
            return {
                message: "No se pudo encontrar este cuadre en la base de datos."
            }
        }
        let {
            consolidacion_id,
            precio,
            producto_id,
        } = request.all()

        cuadre.consolidacion_id = consolidacion_id
        cuadre.precio = precio
        if(producto_id){
            await cuadre.producto().attach(producto_id)
        }
       
        const producto = await Producto.find(producto_id)
        //descuento
        const porcentaje_descuento =  precio / producto.precio
        const descuento = (precio < producto.precio) ? producto.precio - (porcentaje_descuento * producto.precio) : 0
        //ganancia
        const ganancia = (precio > producto.precio) ? precio - producto.precio : 0

        cuadre.ganancia = ganancia
        cuadre.descuento = descuento
        cuadre.save()
        
        return await Consolidacion.query()
        .where('id', consolidacion_id)
        .with('cuadre_producto.producto')
        .fetch()  
    }
    //DELETE
    async delete_cuadre({ params }){
        const { id } = params
        const cuadre = await CuadreProducto.find(id)
        return cuadre.delete()
    }
}

module.exports = CuadroProductoController
