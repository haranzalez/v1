'use strict'

const Model = use('Model')

class Vehiculo extends Model {
    consolidacion(){
        return this.belongsTo('App/Models/Consolidacion')
    }
    transportadora(){
        return this.belongsTo('App/Models/Transportadora')
    }
    conductor(){
        return this.hasOne('App/Models/Conductore')
    }
    trailer(){
        return this.hasOne('App/Models/Trailer')
    }
    cuadre_viaje() {
        return this.belongsToMany('App/Models/CuadreViaje')
        .pivotModel(use('App/Models/PivotCuadreViajeVehiculo'));
    }
}

module.exports = Vehiculo
