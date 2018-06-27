'use strict'

const Model = use('Model')


class Role extends Model {

    users() {
        return this.belongsToMany('App/Models/User').pivotModel(use('App/Models/UserRole'));
    }
    
}

module.exports = Role
