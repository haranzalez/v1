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
        pkg['producto_id'] = cliente.rows[0].$relations.cuadre_producto.rows[0].$relations.producto.rows[0].id
        return pkg
    }
    async get_cuadres_productos_history({request}){
        const { cuadre_producto_id } = request.all()
        return await Database.from('historial_precios_productos').where({cuadre_producto_id})
    }
    async create_cuadre({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const {
            cliente_id,
            producto_id,
            precio_producto,
            precio_negociado,
        } = request.all()
        const cliente = await Cliente.find(cliente_id)
    
        if(cliente){
            const cuadre = await CuadreProducto.create({
                cliente_id,
                precio_negociado,
            })
           
            if(producto_id){
                await cuadre.producto().attach(producto_id)
            }
            //historial
            await Database.table('historial_precios_productos')
            .insert({ 
                cuadre_producto_id: cuadre.id,
                precio_producto,
                precio_negociado,
                fecha: new Date()
            })
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
            precio_producto,
            precio_negociado,
        } = request.all()

        cuadre.precio_negociado = precio_negociado
        cuadre.save()
        if(producto_id){
            await Database.table('pivot_producto_cuadre_productos').where('cuadre_producto_id', id).delete()
            await cuadre.producto().attach(producto_id)
        }
         //historial
         await Database.table('historial_precios_productos')
         .insert({ 
            cuadre_producto_id: id,
            precio_producto,
            precio_negociado,
            fecha: new Date()
         })
        return {
            message: 'success',
        }
    }
    //DELETE
    async delete_cuadre({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const cuadre = await CuadreProducto.find(id)
        return cuadre.delete()
    }
}

module.exports = CuadroProductoController
