'use strict'
const Database = use('Database');

class LoggerController {
     //READ
     async get_logs({ params }){
        const { page } = params
        var off = (page - 1) * 10
        return await Database.table('logging.historial').orderBy('id', 'desc').offset(off).limit(10)
    }
    async get_num_of_records(){
        const res = await Database.raw("select count(*) from logging.historial")
        return res.rows[0].count
    }
}

module.exports = LoggerController
