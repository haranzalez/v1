'use strict'

const Model = use('Model')

class DepositoClienteAplicado extends Model {
    deposito(){
        return this.belongsTo('App/Models/DepositoCliente')
    }
    consolidacion(){
        return this.belongsTo('App/Models/Consolidacion')
    }
}

module.exports = DepositoClienteAplicado
