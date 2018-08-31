'use strict'

const Model = use('Model')

class Servicio extends Model {
    cuadre_servicio(){
        return this.belongsTo('App/Models/CuadreServicio')
    }
}

module.exports = Servicio
