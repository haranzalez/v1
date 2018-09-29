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
    consolidacion(){
        return this.belongsTo('App/Models/Consolidacion')
    }

}

module.exports = CuadreViaje
