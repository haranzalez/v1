'use strict'
const CuadreViaje = use('App/Models/CuadreViaje')
class CuadroViajeController {
    async todos(){
        return await CuadreViaje.all()
    }
    async crearCuadre({ request }){
        const {
            cuadre_final_id,
            destino_id,
            precio,
        } = request.all()
        const cuadre = await CuadreViaje.create({
            cuadre_final_id,
            precio,
        })
        await cuadre.destino().attach(destino_id)
        return cuadre
    }
}

module.exports = CuadroViajeController
