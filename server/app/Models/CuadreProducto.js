'use strict'

const Model = use('Model')

class CuadreProducto extends Model {
    producto() {
        return this.belongsToMany('App/Models/Producto')
        .pivotModel(use('App/Models/PivotProductoCuadreProducto'));
    }
    consolidacion(){
        return this.belongsTo('App/Models/Consolidacion')
    }
}

module.exports = CuadreProducto
