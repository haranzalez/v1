'use strict'

const Model = use('Model')

class CuadreViajeDestino extends Model {
    cuadreViaje(){
        return this.belongsTo('App/Models/CuadreViaje')
    }
    destino(){
        return this.belongsTo('App/Models/Destino')
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

module.exports = CuadreViajeDestino
