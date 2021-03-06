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
        return this.hasMany('App/Models/RoleSubModuloPermiso')
    }


    
}

module.exports = Role
