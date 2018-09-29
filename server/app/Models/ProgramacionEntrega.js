'use strict'

const Model = use('Model')

class ProgramacionEntrega extends Model {
    consolidacion(){
        return this.belongsTo('App/Models/Consolidacion')
    }
}

module.exports = ProgramacionEntrega
