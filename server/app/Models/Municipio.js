'use strict'

const Model = use('Model')

class Municipio extends Model {
    rutas() {
        return this.belongsTo('App/Models/Ruta')
    }
}

module.exports = Municipio
