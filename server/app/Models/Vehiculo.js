'use strict'

const Model = use('Model')

class Vehiculo extends Model {
    conductor(){
        return this.hasOne('App/Models/Conductore')
    }
    trailer(){
        return this.hasOne('App/Models/Trailer')
    }
    cuadre_viaje() {
        return this.belongsTo('App/Models/CuadreViaje')
        .pivotModel(use('App/Models/PivotCuadreViajeVehiculo'));
    }
}

module.exports = Vehiculo
