'use strict'

const Model = use('Model')

class DatosBancariosConductore extends Model {
    conductor(){
        return this.belongsTo('App/Models/Conductore')
    }
}

module.exports = DatosBancariosConductore
