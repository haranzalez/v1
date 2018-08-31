'use strict'

const Model = use('Model')

class Producto extends Model {
    cuadre_producto(){
        return this.belongsTo('App/Models/CuadreProducto')
    }
}

module.exports = Producto
