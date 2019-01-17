'use strict'
const Producto = use('App/Models/Producto');
const Database = use('Database')

class ProductoController {
     //READ
     async get_all_productos({ params }){
        return await Producto.all()
    }

    async get_producto({ params }){
        const { id } = params;
        return await Producto.query()
        .where('id', id).fetch()
    }
    
    //CREATE
    async create_producto({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const {
           nombre,
           descripcion,
           precio
        } = request.all()

        await Producto.create({
           nombre,
           descripcion,
           precio
        })
        return {
            message: 'success'
        }

    }
    //UPDATE
    async update_producto({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params;
        const producto = await Producto.find(id)
        const {
           nombre,
           descripcion,
           precio
        } = request.all()

        producto.nombre = nombre
        producto.descripcion = descripcion
        producto.precio = precio
        producto.save()

        return {
            message: 'success',
        }

    }

     //DELETE
     async delete_producto({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const producto = await Producto.find(id)
        producto.delete()
        return {
            message: 'success'
        }
    }
}

module.exports = ProductoController
