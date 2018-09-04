'use strict'
const CuadreServicio = use('App/Models/CuadreServicio')
class CuadroServicioController {
    async todos(){
        return await CuadreServicio.all()
    }
    async crearCuadre({ request }){
        const {
            cuadre_final_id,
            servicio_id,
            precio,
        } = request.all()
        const cuadre = await CuadreServicio.create({
            cuadre_final_id,
            precio,
        })
        await cuadre.servicio().attach(servicio_id)
        return cuadre
    }
}

module.exports = CuadroServicioController
