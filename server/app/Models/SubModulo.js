'use strict'

const Model = use('Model')

class SubModulo extends Model {

    permisos(){
        return this.hasMany('App/Models/RoleSubModuloPermiso')
    }
    modulo(){
        return this.belongsTo('App/Models/Modulo')
    }

   
}

module.exports = SubModulo
