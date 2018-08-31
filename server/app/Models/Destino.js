'use strict'

const Model = use('Model')

class Destino extends Model {
    cuadre_viaje(){
        return this.belongsTo('App/Models/CuadreViaje')
    }
}

module.exports = Destino
