'use strict'

const Model = use('Model')

class Conductore extends Model {
    datos_bancarios(){
        return this.hasMany('App/Models/DatosBancariosConductore')
    }
    licencias(){
        return this.hasMany('App/Models/LicenciasConductores')
    }
    vehiculo() {
        return this.belongsTo('App/Models/Vehiculos')
    }
}

module.exports = Conductore
