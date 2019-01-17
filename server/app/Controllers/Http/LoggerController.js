'use strict'
const Database = use('Database');

class LoggerController {
     //READ
     async get_logs({ params }){
        return await Database.select('*').from('logging.historial')
    }
}

module.exports = LoggerController
