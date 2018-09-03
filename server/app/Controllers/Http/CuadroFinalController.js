'use strict'

const CuadreFinal = use('App/Models/CuadreFinal')

class CuadroFinalController {

    async todos(){
        return await CuadreFinal.query()
        .with('cliente')
        .with('cuadre_producto')
        .with('cuadre_viaje')
        .with('cuadre_servicios').fetch()
    }

    async porCliente({request}){
        const { cid } = request.all()
        return await CuadreFinal.query().where('cliente_id', cid)
    }

    async crearCuadre({ request }){
    const { cliente_id } = request.all()

        return await CuadreFinal.create({
        cliente_id,
        estado: 'activo'
        })
    }

    async alterarCuadre({ request } id){
        const { 
            precio, 
            descuento, 
            estado 
        } = request.all()

        const cuadre = await CuadreFinal.find(id)
        cuadre.precio = precio
        cuadre.descuento = descuento
        cuadre.estado = estado
        cuadre.save()
        return cuadre
    }



}

module.exports = CuadroFinalController
