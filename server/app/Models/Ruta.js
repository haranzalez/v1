'use strict'

const Model = use('Model')

class Ruta extends Model {
    cuadre_viajes(){
        return this.belongsToMany('App/Models/CuadreViaje')
        .pivotModel(use('App/Models/PivotCuadreViajeRuta'));
    }
    municipios() {
        return this.hasMany('App/Models/Municipio')
    }
    comentarios(){
        return this.hasMany('App/Models/ComentariosRuta')
    }
}

module.exports = Ruta
