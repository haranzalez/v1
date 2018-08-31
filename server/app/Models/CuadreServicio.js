'use strict'

const Model = use('Model')

class CuadreServicio extends Model {
    cuadre_final(){
        return this.belongsTo('App/Models/CuadreFinal')
    }
    servicio(){
        return this.hasMany('App/Models/Producto')
    }
}

module.exports = CuadreServicio
