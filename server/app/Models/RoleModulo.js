'use strict'

const Model = use('Model')

class RoleModulo extends Model {
   

    roles(){
        return this.belongsTo('App/Models/Role', 'id', 'role_id')
    }
    modulos(){
        return this.belongsTo('App/Models/Modulo', 'id', 'modulo_id')
    }

    /**
   * Override this method or it will try to return id on save.
   */
  static get primaryKey() {
    return null;
  }

  static get incrementing() {
    return false;
  }

  /**
   * Legacy pivot table does not have created_at column but YMMV.
   */
  static get createdAtColumn() {
    return undefined;
  }

  /**
   * Legacy pivot table does not have updated_at column but YMMV.
   */
  static get updatedAtColumn() {
    return undefined;
  }
}

module.exports = RoleModulo
