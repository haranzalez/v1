'use strict'

const Model = use('Model')

class PivotCuadreViajeRuta extends Model {
    rutas(){
        return this.belongsTo('App/Models/Ruta')
    }
    cuadre_viaje(){
        return this.belongsTo('App/Models/CuadreViaje')
    }
}

module.exports = PivotCuadreViajeRuta
