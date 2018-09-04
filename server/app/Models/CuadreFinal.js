'use strict'

const Model = use('Model')

class CuadreFinal extends Model {
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
    cuadreProducto(){
        return this.hasOne('App/Models/CuadreProducto')
    }
    cuadreViaje(){
        return this.hasOne('App/Models/CuadreViaje')
    }
    cuadreServicios(){
        return this.hasOne('App/Models/CuadreServicio')
    }
}

module.exports = CuadreFinal
