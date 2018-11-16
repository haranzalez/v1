'use strict'
const CuadreViaje = use('App/Models/CuadreViaje')
const Cliente = use('App/Models/Cliente')
const Ruta = use('App/Models/Ruta')
class CuadroViajeController {
    async get_all_cuadres(){
        const cuadre = await CuadreViaje.query()
        .with('vehiculo')
        .with('ruta.municipios')
        .fetch()

        for(let prop in cuadre.rows){
            let cliente = await Cliente.find(cuadre.rows[prop]['cliente_id'])
            cuadre.rows[prop]['nombre_cliente'] = cliente.nombre_razon_social
        }
        
        return cuadre
    }
    async get_cuadre({ params }){
        const { id } = params;
        return await CuadreViaje.query()
        .where('id', id).fetch()
    }
    async create_cuadre({ request }){
        let {
            cliente_id,
            flete,
            ruta_id,
            anticipo,
            vehiculo_id,
            ajuste,
            debe
        } = request.all()
        
        const cuadre = await CuadreViaje.create({
            cliente_id,
            flete,
            anticipo,
            ajuste,
            debe
        })
        if(vehiculo_id){
            await cuadre.vehiculo().attach(vehiculo_id)
        }
        if(ruta_id){
            await cuadre.ruta().attach(ruta_id)
        }
        return {
            message: 'success'
        }
    }
    async update_cuadre({ params, request }){
        const { id } = params;
        //Get request variables
        let {
            cliente_id,
            flete,
            ruta_id,
            anticipo,
            vehiculo_id,
            ajuste,
            debe
        } = request.all()
        //find cuadre to update
        const cuadre = await CuadreViaje.find(id)//returns Object
        if(cuadre === null){
            return {
                message: 'No se pudo encontrar este cuadre en los registros'
            }
        }
        cuadre.cliente_id = cliente_id
        cuadre.flete = flete
        cuadre.anticipo = anticipo
        cuadre.ajuste = ajuste
        cuadre.debe = debe
        if(ruta_id){
            await cuadre.ruta().attach(ruta_id)
        }
        if(vehiculo_id){
            await cuadre.vehiculo().attach(vehiculo_id)
        }
        cuadre.save()

       return {
           message: 'success'
       }
    }
    //DELETE
    async delete_cuadre({ params }){
        const { id } = params
        const cuadre = await CuadreProducto.find(id)
        return cuadre.delete()
    }
}
module.exports = CuadroViajeController
