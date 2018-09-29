'use strict'

const Model = use('Model')

class Consolidacion extends Model {
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
    cuadre_producto(){
        return this.hasOne('App/Models/CuadreProducto')
    }
    cuadre_viaje(){
        return this.hasOne('App/Models/CuadreViaje')
    }
    deposito_aplicados(){
        return this.hasMany('App/Models/DepositoClienteAplicado')
    }
    programacion_entrega(){
        return this.hasOne('App/Models/ProgramacionEntrega')
    }

}

module.exports = Consolidacion
