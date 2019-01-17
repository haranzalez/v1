'use strict'
const CuadreServicio = use('App/Models/CuadreServicio')
const Cliente = use('App/Models/Cliente')
const Database = use('Database')
class CuadroServicioController {
    async get_all(){
        return await CuadreServicio.all()
    }
    async get_one({ params }){
        const { id } = params;
        return await CuadreServicio.query()
        .where('id', id).with('servicio').fetch()
    }
    async get_client_cuadres({ params }){
        const { id } = params;
        const cliente = await Cliente.query().where('id', id).with('cuadre_servicio.servicio').fetch()
        const pkg = cliente.rows[0].$relations.cuadre_servicio;
        pkg['nombre_servicio'] = cliente.rows[0].$relations.cuadre_servicio.rows[0].$relations.servicio.rows[0].nombre;
        pkg['precio_servicio'] = cliente.rows[0].$relations.cuadre_servicio.rows[0].$relations.servicio.rows[0].precio;
        console.log(pkg)
        return pkg
    }
    async create_cuadre({ auth, request }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const {
            cliente_id,
            servicio_id,
            precio,
            ajuste,
        } = request.all()
        const cliente = await Cliente.find(cliente_id)
    
        if(cliente){
            const cuadre = await CuadreServicio.create({
                cliente_id,
                precio,
                ajuste,
            })
           
            if(servicio_id){
                await cuadre.servicio().attach(servicio_id)
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
        const cuadre = await CuadreServicio.find(id)
        const {
            servicio_id,
            precio,
            ajuste,
        } = request.all()

        cuadre.precio = precio
        cuadre.ajuste = ajuste
        cuadre.save()
        if(servicio_id){
            await cuadre.servicio().attach(servicio_id)
        }
        return {
            message: 'success',
        }
    }
    //DELETE
    async delete_cuadre({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const cuadre = await CuadreServicio.find(id)
        cuadre.delete()
        return {
            message: 'success'
        }
    }
}

module.exports = CuadroServicioController
