'use strict'

const Model = use('Model')

class CuadreViaje extends Model {
    cuadre_final(){
        return this.belongsTo('App/Models/CuadreFinal')
    }
    destino(){
        return this.hasOne('App/Models/Destino')
    }
}

module.exports = CuadreViaje
