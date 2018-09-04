'use strict'

const Model = use('Model')

class Servicio extends Model {
    cuadreServicio() {
        return this.belongsToMany('App/Models/CuadreServicio')
        .pivotModel(use('App/Models/CuadreServicioServicio'));
    }
}

module.exports = Servicio
