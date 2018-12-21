'use strict'

const Model = use('Model')

class CuadreViaje extends Model {
    ruta() {
        return this.belongsToMany('App/Models/Ruta')
        .pivotModel(use('App/Models/PivotCuadreViajeRuta'));
    }
    vehiculo() {
        return this.belongsToMany('App/Models/Vehiculo')
        .pivotModel(use('App/Models/PivotCuadreViajeVehiculo'));
    }
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
    consolidacion(){
        return this.belongsToMany('App/Models/Consolidacion')
        .pivotModel(use('App/Models/PivotConsolidacionCuadreRutas'));
    }

}

module.exports = CuadreViaje
