'use strict'

const Model = use('Model')

class Transportadora extends Model {
   
    conductor(){
        return this.hasMany('App/Models/Conductore')
    }
    trailer(){
        return this.hasMany('App/Models/Trailer')
    }
    vehiculo(){
        return this.hasMany('App/Models/Vehiculo')
    }
   
}

module.exports = Transportadora