'use strict'

const Model = use('Model')

class Consolidacion extends Model {
    cliente(){
        return this.belongsTo('App/Models/Cliente')
    }
    cuadre_producto(){
        return this.belongsToMany('App/Models/CuadreProducto')
        .pivotModel(use('App/Models/PivotConsolidacionCuadreProductos'));
    }
    cuadre_servicio(){
        return this.belongsToMany('App/Models/CuadreServicio')
        .pivotModel(use('App/Models/PivotConsolidacionCuadreServicios'));
    }
    cuadre_ruta(){
        return this.belongsToMany('App/Models/CuadreViaje')
        .pivotModel(use('App/Models/PivotConsolidacionCuadreRutas'));
    }
    deposito_aplicados(){
        return this.hasMany('App/Models/DepositoClienteAplicado')
    }
    programacion_entrega(){
        return this.hasOne('App/Models/ProgramacionEntrega')
    }

}

module.exports = Consolidacion
