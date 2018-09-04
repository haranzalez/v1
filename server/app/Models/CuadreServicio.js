'use strict'

const Model = use('Model')

class CuadreServicio extends Model {
    cuadreFinal(){
        return this.belongsTo('App/Models/CuadreFinal')
    }
    servicio() {
        return this.belongsToMany('App/Models/Servicio')
        .pivotModel(use('App/Models/CuadreServicioServicio'));
    }
}

module.exports = CuadreServicio
