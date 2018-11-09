'use strict'

const Model = use('Model')

class Municipio extends Model {
    rutas() {
        return this.belongsToMany('App/Models/Ruta')
        .pivotModel(use('App/Models/PivotRutasMunicipio'));
    }
}

module.exports = Municipio
