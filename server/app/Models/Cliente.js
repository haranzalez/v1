'use strict'

const Model = use('Model')

class Cliente extends Model {
    cuadre_viaje(){
        return this.hasMany('App/Models/CuadreViaje')
    }
    cuadre_producto(){
        return this.hasMany('App/Models/CuadreProducto')
    }
    cuadre_servicio(){
        return this.hasMany('App/Models/CuadreServicio')
    }
    deposito(){
        return this.hasMany('App/Models/DepositoCliente')
    }
    tipo_negociacion(){
        return this.hasOne('App/Models/ClienteTipoNegociacion')
    }

}

module.exports = Cliente
