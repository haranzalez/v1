'use strict'

const Model = use('Model')

class PivotCuadreViajeVehiculo extends Model {
    cuadre_viaje(){
        return this.belongsTo('App/Models/CuadreViaje')
    }
    vehiculo(){
        return this.belongsTo('App/Models/Vehiculos')
    }
}

module.exports = PivotCuadreViajeVehiculo
