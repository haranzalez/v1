'use strict'

const Model = use('Model')

class RoleSubModuloPermiso extends Model {

    roles(){
        this.belongsTo('App/Models/Role');
    }
    subModulos(){
        this.belongTo('App/Models/SubModulo');
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

module.exports = RoleSubModuloPermiso
