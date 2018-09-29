'use strict'

const Model = use('Model')

class DepositoCliente extends Model {
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
    deposito_aplicados(){
        return this.hasMany('App/Models/DepositoClienteAplicado')
    }
}

module.exports = DepositoCliente
