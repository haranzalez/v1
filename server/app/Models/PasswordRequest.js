'use strict'

const Model = use('Model')

class PasswordRequest extends Model {

    users(){
        this.belongsTo('App/Models/User')
    }
}

module.exports = PasswordRequest
