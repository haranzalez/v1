'use strict'

const Model = use('Model')

class CuadreFinal extends Model {
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
    cuadre_producto(){
        return this.hasMany('App/Models/CuadreProducto')
    }
    cuadre_viaje(){
        return this.hasMany('App/Models/CuadreViaje')
    }
    cuadre_servicios(){
        return this.hasMany('App/Models/CuadreServicio')
    }
}

module.exports = CuadreFinal
