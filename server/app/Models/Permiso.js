'use strict'

const Model = use('Model')

class Permiso extends Model {
 
    roles(){
        return this.belongsToMany('App/Models/Role')
        .pivotModel(use('App/Models/RoleModuloPermiso'));
    }
    modulos(){
        return this.belongsToMany('App/Models/Modulo')
        .pivotModel(use('App/Models/RoleModuloPermiso'));
    }
}

module.exports = Permiso
