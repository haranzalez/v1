'use strict'
const CuadreServicio = use('App/Models/CuadreServicio')
class CuadroServicioController {
    async todos(){
        return await CuadreServicio.all()
    }
    async crearCuadre({ request }){
        const {
            servicio_id,
            precio,
        } = request.all()
        return await CuadreServicio.create({
            servicio_id,
            precio,
        })
    }
}

module.exports = CuadroServicioController
