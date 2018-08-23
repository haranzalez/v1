'use strict'

/*
|--------------------------------------------------------------------------
| ModuleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class ModuleSeeder {
  async run () {
    const module = await Database.table('modulos')
    console.log(module)
  }
}

module.exports = ModuleSeeder
