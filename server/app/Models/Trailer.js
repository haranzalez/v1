'use strict'

const Model = use('Model')

class Trailer extends Model {
    vehiculo(){
        return this.belongsTo('App/Models/Vehiculos')
    }
}

module.exports = Trailer
