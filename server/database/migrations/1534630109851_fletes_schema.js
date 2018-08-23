'use strict'

const Schema = use('Schema')

class FletesSchema extends Schema {
  up () {
    this.create('fletes', (table) => {
      table.increments()
      table.numeric('precio')
      table.timestamps()
    })
  }

  down () {
    this.drop('fletes')
  }
}

module.exports = FletesSchema
