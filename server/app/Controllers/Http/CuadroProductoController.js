'use strict'
const CuadreProducto = use('App/Models/CuadreProducto')
class CuadroProductoController {

    async todos(){
        return await CuadreProducto.all()
    }
    async crearCuadre({ request }){
        const {
            cuadre_final_id,
            producto_id,
            precio,
            tn,//toneladas
            kg,//kilogramos
        } = request.all()
        
        const cuadre = await CuadreProducto.create({
            cuadre_final_id,
            precio,
            toneladas: tn,
            kilogramos: kg,
        })
        await cuadre.producto().attach(producto_id)
        return cuadre
    }
}

module.exports = CuadroProductoController
