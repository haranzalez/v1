'use strict'

const Model = use('Model')

class CuadreProducto extends Model {
    producto() {
        return this.belongsToMany('App/Models/Producto')
        .pivotModel(use('App/Models/PivotProductoCuadreProducto'));
    }
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
    consolidacion(){
        return this.belongsToMany('App/Models/Consolidacion')
        .pivotModel(use('App/Models/PivotConsolidacionCuadreProductos'));
    }
}

module.exports = CuadreProducto
