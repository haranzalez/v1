'use strict'

const CuadreFinal = use('App/Models/CuadreFinal')

class CuadroFinalController {

    async todos(){
        return await CuadreFinal.all()
    }

    async porCliente({request}){
        const { cid } = request.all()
        return await CuadreFinal.query().where('cliente_id', cid)
    }

    async crearCuadre({ request }){
    const { 
    cliente_id,
	cuadre_producto_id,
	cuadre_viaje_id,
	cuadre_servicio_id,
	precio,
	descuento,
	estado } = request.all()

        return await CuadreFinal.create({
        cliente_id,
        cuadre_producto_id,
        cuadre_viaje_id,
        cuadre_servicio_id,
        precio,
        descuento,
        estado
        })
    }



}

module.exports = CuadroFinalController
