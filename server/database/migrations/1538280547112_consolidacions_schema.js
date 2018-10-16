'use strict'

const Schema = use('Schema')

class ConsolidacionsSchema extends Schema {
  up () {
    this.table('consolidacions', (table) => {
      table.float('ganancia')
    })
  }

  down () {
    this.table('consolidacions', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ConsolidacionsSchema
