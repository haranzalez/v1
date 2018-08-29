'use strict'

const Model = use('Model')
const Hash = use('Hash')


class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }else{
        userInstance.password = await Hash.make('cambiarme')
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  roles() {
    return this.belongsToMany('App/Models/Role').pivotModel(use('App/Models/UserRole'));
  }

  passwordRequests() {
    return this.hasMany('App/Models/PasswordRequest')
  }

  logs() {
    return this.hasMany('App/Models/UserLog')
  }

  static formatDates (field, value) {
    if (field === 'salida') {
      return value.format('YYYY-MM-DD')
    }
    return super.formatDates(field, value)
  }


  
}

module.exports = User
