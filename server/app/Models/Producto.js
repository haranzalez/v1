'use strict'

const Model = use('Model')

class Producto extends Model {
    cuadre_producto() {
        return this.belongsToMany('App/Models/CuadreProducto')
        .pivotModel(use('App/Models/PivotProductoCuadreProducto'));
    }
}

module.exports = Producto
