'use strict'

const Model = use('Model')

class Producto extends Model {

    cuadreProducto() {
        return this.belongsToMany('App/Models/CuadreProducto')
        .pivotModel(use('App/Models/CuadreProductoProductos'));
    }
   
}

module.exports = Producto
