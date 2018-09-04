'use strict'

const Model = use('Model')

class CuadreViaje extends Model {
    cuadreFinal(){
        return this.belongsTo('App/Models/CuadreFinal')
    }
    destino() {
        return this.belongsToMany('App/Models/Destino')
        .pivotModel(use('App/Models/CuadreViajeDestino'));
    }
}

module.exports = CuadreViaje
