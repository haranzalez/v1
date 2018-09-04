'use strict'

const Model = use('Model')

class CuadreProducto extends Model {

    cuadreFinal(){
        return this.belongsTo('App/Models/CuadreFinal')
    }
    producto() {
        return this.belongsToMany('App/Models/Producto')
        .pivotModel(use('App/Models/CuadreProductoProductos'));
    }

}

module.exports = CuadreProducto
