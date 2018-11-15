'use strict'

const Model = use('Model')

class Consolidacion extends Model {
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
    deposito_aplicados(){
        return this.hasMany('App/Models/DepositoClienteAplicado')
    }
    programacion_entrega(){
        return this.hasOne('App/Models/ProgramacionEntrega')
    }

}

module.exports = Consolidacion
