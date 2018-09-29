'use strict'

const Model = use('Model')

class Cliente extends Model {
    consolidacion(){
        return this.hasMany('App/Models/Consolidacion')
    }
    deposito(){
        return this.hasMany('App/Models/DepositoCliente')
    }
    tipo_negociacion(){
        return this.hasOne('App/Models/ClienteTipoNegociacion')
    }

}

module.exports = Cliente
