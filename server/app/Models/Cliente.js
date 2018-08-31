'use strict'

const Model = use('Model')

class Cliente extends Model {
    cuadre_Final(){
        return this.hasMany('App/Models/CuadreFinal')
    }
}

module.exports = Cliente
