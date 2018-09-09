'use strict'

const CuadreFinal = use('App/Models/CuadreFinal')
const CuadreProducto = use('App/Models/CuadreProducto')

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
        const cuadreProducto = await CuadreProducto.query().where('cuadre_final_id', id)
        console.log(cuadreProducto)
        var precioProducto = await cuadreProducto.producto().fetch()
        
        precioProducto = precioProducto.precio
       /* cuadre.precio = precio
        cuadre.descuento = descuento
        cuadre.estado = estado
        cuadre.save()*/
        return {
            res: precioProducto
        }
    }


}

module.exports = CuadroFinalController
