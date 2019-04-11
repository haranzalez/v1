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
        return pkg; 
    }
    async table_fields({ params }){
        const { tname } = params
        const res = await Database.raw("SELECT * FROM "+tname)
        const pkg = {}
        var count = 0
        for(let prop in res.fields){
            res.fields[prop].name = res.fields[prop].name.replace('_', ' ').replace('_', ' ').replace('_', ' ')
            var split = res.fields[prop].name.split(' ')
            if(split[1] == 'id'){
                continue;
            }
            if(split[0] == 'created' || split[0] == 'updated'){
                continue;
            }
            res.fields[prop].name = res.fields[prop].name.charAt(0).toUpperCase() + res.fields[prop].name.slice(1)
            pkg[count] = res.fields[prop].name
            count++
        }
        return pkg
    }
    async table_field_data({ request }){
        var { table, field } = request.all()
        table = table.replace(' ', '_').replace(' ', '_').replace(' ', '_')
        table = table.charAt(0).toLowerCase() + table.slice(1)
        field = field.replace(' ', '_').replace(' ', '_').replace(' ', '_')
        field = field.charAt(0).toLowerCase() + field.slice(1)

        const res = await Database.select(field).from(table)
        
        const pkg = []
        for(let prop in res){
            pkg.push(res[prop][field])
        }
        console.log(pkg)
        return pkg
    }
}

module.exports = ReportsController