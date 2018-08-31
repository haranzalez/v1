'use strict'
const CuadreProducto = use('App/Models/CuadreProducto')
class CuadroProductoController {

    async todos(){
        return await CuadreProducto.all()
    }
    async crearCuadre({ request }){
        const {
            producto_id,
            precio,
            tn,//toneladas
            kg,//kilogramos
        } = request.all()
        return await CuadreProducto.create({
            producto_id,
            precio,
            toneladas: tn,
            kilogramos: kg,
        })
    }
}

module.exports = CuadroProductoController
