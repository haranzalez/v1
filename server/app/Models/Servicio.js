'use strict'

const Model = use('Model')

class Servicio extends Model {
    cuadre_servicio() {
        return this.belongsToMany('App/Models/CuadreServicio')
        .pivotModel(use('App/Models/PivotServicioCuadreServicio'));
    }
}

module.exports = Servicio