'use strict'
const CuadreViaje = use('App/Models/CuadreViaje')
class CuadroViajeController {
    async todos(){
        return await CuadreViaje.all()
    }
    async crearCuadre({ request }){
        const {
            destino_id,
            precio,
        } = request.all()
        return await CuadreViaje.create({
            destino_id,
            precio,
        })
    }
}

module.exports = CuadroViajeController
