'use strict'
const CuadreProducto = use('App/Models/CuadreProducto')
const Cliente = use('App/Models/Cliente')
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
            cliente_id,
            producto_id,
            precio,
            descuento,
            ganancia,
        } = request.all()
        const cliente = await Cliente.find(cliente_id)
        
        if(cliente.rows > 0){
            const cuadre = await CuadreProducto.create({
                cliente_id,
                precio,
                ganancia,
                descuento,
            })
           
            if(producto_id){
                await cuadre.producto().attach(producto_id)
            }
            return {
                message: 'success',
            }
        }
        return {
            message: 'Operacion Cancelada: El cliente no existe registrado en la base de datos',
        }
    }
    async update_cuadre({ params, request }){
        const { id } = params;
        const cuadre = await CuadreProducto.find(id)
        const {
            cliente_id,
            producto_id,
            precio,
            descuento,
            ganancia,
        } = request.all()

        cuadre.cliente_id = cliente_id
        cuadre.precio = precio
        if(producto_id){
            await cuadre.producto().attach(producto_id)
        }
        cuadre.ganancia = ganancia
        cuadre.descuento = descuento
        cuadre.save()
        
        return {
            message: 'success',
        }
    }
    //DELETE
    async delete_cuadre({ params }){
        const { id } = params
        const cuadre = await CuadreProducto.find(id)
        return cuadre.delete()
    }
}

module.exports = CuadroProductoController
