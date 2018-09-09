'use strict'

const Model = use('Model')

class LicenciasConductore extends Model {
    conductor(){
        return this.belongsTo('App/Models/Conductore')
    }
}

module.exports = LicenciasConductore
