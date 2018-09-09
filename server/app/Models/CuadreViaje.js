'use strict'

const Model = use('Model')

class CuadreViaje extends Model {
    ruta() {
        return this.belongsTo('App/Models/Rutas')
        .pivotModel(use('App/Models/PivotCuadreViajeRuta'));
    }
    vehiculo() {
        return this.belongsTo('App/Models/Vehiculo')
        .pivotModel(use('App/Models/PivotCuadreViajeVehiculo'));
    }

}

module.exports = CuadreViaje
