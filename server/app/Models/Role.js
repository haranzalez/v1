'use strict'

const Model = use('Model')


class Role extends Model {

    users() {
        return this.belongsToMany('App/Models/User')
        .pivotModel(use('App/Models/UserRole'));
    }

    modulos() {
        return this.belongsToMany('App/Models/Modulo')
        .pivotModel(use('App/Models/RoleModulo'));
    }

    permisos() {
        return this.belongsToMany('App/Models/Permiso')
        .pivotModel(use('App/Models/RoleModuloPermiso'));
    }


    
}

module.exports = Role
