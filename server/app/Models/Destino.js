'use strict'

const Model = use('Model')

class Destino extends Model {
 
    cuadreViaje() {
        return this.belongsToMany('App/Models/CuadreViaje')
        .pivotModel(use('App/Models/CuadreViajeDestino'));
    }
}

module.exports = Destino
