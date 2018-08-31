'use strict'

const Model = use('Model')

class CuadreProducto extends Model {
    cuadre_final(){
        return this.belongsTo('App/Models/CuadreFinal')
    }
    producto(){
        return this.hasOne('App/Models/Producto')
    }
}

module.exports = CuadreProducto
