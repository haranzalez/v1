'use strict'

const Model = use('Model')

class Trailer extends Model {
    vehiculo(){
        return this.belongsTo('App/Models/Vehiculos')
    }
    transportadora(){
        return this.belongsTo('App/Models/Transportadora')
    }
}

module.exports = Trailer
