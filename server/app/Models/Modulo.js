'use strict'

const Model = use('Model')

class Modulo extends Model {

    roles() {
        return this.belongsToMany('App/Models/Role')
        .pivotModel(use('App/Models/RoleModulo'));
    }

    permisos() {
        return this.hasMany('App/Models/RoleModuloPermiso')
    }

}

module.exports = Modulo
