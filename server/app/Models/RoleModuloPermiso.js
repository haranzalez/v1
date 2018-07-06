'use strict'

const Model = use('Model')

class RoleModuloPermiso extends Model {
    roles(){
        this.belongsTo('App/Models/Role', 'id', 'role_id')
    }
    modulos(){
        this.belongsTo('App/Models/Modulo', 'id', 'modulo_id')
    }
    permisos(){
        this.belongsTo('App/Models/Permiso', 'id', 'permiso_id')
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

module.exports = RoleModuloPermiso
