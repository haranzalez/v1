'use strict'
const Servicio = use('App/Models/Servicio');
const Database = use('Database')

class ServicioController {
     //READ
     async get_all({ params }){
        return await Servicio.all()
    }

    async get_one({ params }){
        const { id } = params;
        return await Servicio.query()
        .where('id', id).fetch()
    }
    
    //CREATE
    async create_servicio({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const {
           nombre,
           descripcion,
           precio
        } = request.all()

        await Servicio.create({
           nombre,
           descripcion,
           precio
        })
        return {
            message: 'success'
        }

    }
    //UPDATE
    async update_servicio({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params;
        const servicio = await Servicio.find(id)
        const {
           nombre,
           descripcion,
           precio
        } = request.all()

        servicio.nombre = nombre
        servicio.descripcion = descripcion
        servicio.precio = precio
        servicio.save()

        return {
            message: 'success',
        }

    }

     //DELETE
     async delete_servicio({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const servicio = await Servicio.find(id)
        servicio.delete()
        return {
            message: 'success'
        }
    }
}

module.exports = ServicioController
