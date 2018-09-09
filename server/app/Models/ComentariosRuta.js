'use strict'

const Model = use('Model')

class ComentariosRuta extends Model {
    ruta(){
        return this.belongsTo('App/Models/Ruta')
    }
}

module.exports = ComentariosRuta
