'use strict'

const Model = use('Model')

class ClienteTipoNegociacion extends Model {
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
}

module.exports = ClienteTipoNegociacion
