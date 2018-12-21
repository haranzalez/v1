'use strict'

const Model = use('Model')

class CuadreServicio extends Model {
    servicio() {
        return this.belongsToMany('App/Models/Servicio')
        .pivotModel(use('App/Models/PivotServicioCuadreServicio'));
    }
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
    consolidacion(){
        return this.belongsToMany('App/Models/Consolidacion')
        .pivotModel(use('App/Models/PivotConsolidacionCuadreServicios'));
    }
}

module.exports = CuadreServicio
