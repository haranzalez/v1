'use strict'
const CuadreProducto = use('App/Models/CuadreProducto')
const Cliente = use('App/Models/Cliente')
const Producto = use('App/Models/Producto')
const Database = use('Database')
class CuadroProductoController {

    async get_all_cuadres(){
        return await CuadreProducto.all()
    }
    async get_cuadre({ params }){
        const { id } = params;
        return await CuadreProducto.query()
        .where('id', id).with('producto').fetch()
    }
    async get_client_cuadres({ params }){
        const { id } = params;
        const cliente = await Cliente.query().where('id', id).with('cuadre_producto.producto').fetch()
        const pkg = cliente.rows[0].$relations.cuadre_producto;
        pkg['nombre_producto'] = cliente.rows[0].$relations.cuadre_producto.rows[0].$relations.producto.rows[0].nombre
        pkg['precio_producto'] = cliente.rows[0].$relations.cuadre_producto.rows[0].$relations.producto.rows[0].precio
        return pkg
    }
    async create_cuadre({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
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
    async update_cuadre({ auth, params, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
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
        console.log(producto_id)
        if(producto_id){
            await cuadre.producto().attach(producto_id)
        }
        
        return {
            message: 'success',
        }
    }
    //DELETE
    async delete_cuadre({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        console.log(params)
        const { id } = params
        const cuadre = await CuadreProducto.find(id)
        return cuadre.delete()
    }
}

module.exports = CuadroProductoController
