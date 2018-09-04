'use strict'

const CuadreFinal = use('App/Models/CuadreFinal')

class CuadroFinalController {

    async todos(){
        return await CuadreFinal.query()
        .with('cliente')
        .with('cuadreProducto.producto')
        .with('cuadreViaje.destino')
        .with('cuadreServicios.servicio')
        .fetch()
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

    async alterarCuadre({ request, params }){
        const { 
            precio, 
            descuento, 
            estado 
        } = request.all()
        const { id } = params

        const cuadre = await CuadreFinal.query().where('id', id).fetch(id)
        cuadre.precio = precio
        cuadre.descuento = descuento
        cuadre.estado = estado
        cuadre.save()
        return cuadre
    }



}

module.exports = CuadroFinalController
