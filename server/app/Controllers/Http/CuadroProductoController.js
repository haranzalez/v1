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
    async get_client_cuadres({ params }){
        const { id } = params;
        const cliente = await Cliente.query().where('id', id).with('cuadre_producto.producto').fetch()
        const pkg = cliente.rows[0].$relations.cuadre_producto;
        pkg['nombre_producto'] = cliente.rows[0].$relations.cuadre_producto.rows[0].$relations.producto.rows[0].nombre
        pkg['precio_producto'] = cliente.rows[0].$relations.cuadre_producto.rows[0].$relations.producto.rows[0].precio
        return pkg
    }
    async create_cuadre({ request }){
        const {
            cliente_id,
            producto_id,
            precio,
            ajuste,
        } = request.all()
        const cliente = await Cliente.find(cliente_id)
    
        if(cliente){
            const cuadre = await CuadreProducto.create({
                cliente_id,
                precio,
                ajuste,
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
            producto_id,
            precio,
            ajuste,
        } = request.all()

        cuadre.precio = precio
        cuadre.ajuste = ajuste
        cuadre.save()
        if(producto_id){
            await cuadre.producto().attach(producto_id)
        }
        
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
