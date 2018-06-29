'use strict'

const Model = use('Model')

class Permiso extends Model {

    roles() {
        return this.belongsToMany('App/Models/Role').pivotModel(use('App/Models/RolePermiso'));
    }
    
}

module.exports = Permiso
