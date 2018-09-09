'use strict'

const Model = use('Model')

class PivotRutasMunicipio extends Model {
    rutas(){
        return this.belongsTo('App/Models/Ruta')
    }
    municipios(){
        return this.belongsTo('App/Models/Municipio')
    }
}

module.exports = PivotRutasMunicipio
