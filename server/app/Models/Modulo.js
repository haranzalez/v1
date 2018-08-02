'use strict'

const Model = use('Model')

class Modulo extends Model {

    roles() {
        return this.belongsToMany('App/Models/Role')
        .pivotModel(use('App/Models/RoleModulo'));
    }
    subModulo(){
        return this.hasMany('App/Models/SubModulo')
    }
}

module.exports = Modulo
