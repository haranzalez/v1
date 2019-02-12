'use strict'
const Database = use('Database')


class ReportsController {
    async tables_names(){
        const res =  await Database.raw("SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public'")
        const pkg = {}
        for(let prop in res.rows){
            var spli = res.rows[prop].tablename.split('_')
            if(spli[0] == 'pivot'){
                continue;
            }
            var mod = res.rows[prop].tablename.replace('_', ' ').replace('_', ' ')
            mod =  mod.charAt(0).toUpperCase() + mod.slice(1)
            pkg[res.rows[prop].tablename] = mod;
           
        }
        console.log(pkg)
        return pkg; 
    }
    async table_fields({ params }){
        const { tname } = params
        const res = await Database.raw("SELECT * FROM "+tname)
        const pkg = {}
        for(let prop in res.rows[0]){
            prop = prop.replace('_', ' ').replace('_', ' ').replace('_', ' ')
            var split = prop.split(' ')
            if(split[1] == 'id'){
                continue;
            }
            if(split[0] == 'created' || split[0] == 'updated'){
                continue;
            }
            prop = prop.charAt(0).toUpperCase() + prop.slice(1)
            pkg[prop]
        }
        return pkg
    }
    async table_field_data({ params }){
        var { table, field } = params
        table = table.replace(' ', '_').replace(' ', '_').replace(' ', '_')
        table = table.charAt(0).toLowerCase() + table.slice(1)
        field = field.replace(' ', '_').replace(' ', '_').replace(' ', '_')
        field = field.charAt(0).toLowerCase() + field.slice(1)
        const res = await Database.raw("SELECT "+field+" FROM "+table)
        const pkg = []
        for(let prop in res.rows){
            pkg.push(res.rows[prop][field])
        }
        return pkg
    }
}

module.exports = ReportsController