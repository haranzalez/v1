const Database = use('Database')
const Logs = use('App/Models/UserLog')
const moment = use('moment')

class UsersLogService {

    async login(ip, token, userId){
        let check = await this.checkUserLogs(userId)
        if(check == false){
            const res = await Logs.create({
                user_id: userId,
                ip: ip,
                token: token,
                is_revoke: false,
            })
            return true
        }else{
            return check
        }
        
        
    }

    async logout(request){
        const token = request.header('Authorization').split(' ')[1]
        const v = await Logs.query().where('token', token).fetch()
        console.log(v.rows[0])
        if(v.rows.length > 0){
            await Database
            .table('user_logs')
            .where('token', token)
            .update({ salida: new Date(), is_revoke: true})

            return {
                mess: 'Su session cerro exitosamente!.'
            };
        }else{
            return {
                mess: 'Toke espirado. Usted o alguien cerro esta session: '+v.rows[0].salida+'. Porfavor inicie session de nuevo para obtener un nuevo token.'
            }
        }  
        
    }
    async checkUserLogs(uid){
        const uLogs = await Logs.query().where('user_id', uid).fetch()
        const activeSess = {}
        if(uLogs.rows.length > 0){
            for(let prop in uLogs.rows){
                if(uLogs.rows[prop]['is_revoke'] == false){
                    activeSess['ip'] = uLogs.rows[prop]['ip']
                    activeSess['entrada'] = uLogs.rows[prop]['entrada']
                }
            }
                
            if(Object.keys(activeSess).length > 0){
                return activeSess
            }else{
                return false
            }
        }else{
            return false
        }
       
    }
}

module.exports = UsersLogService;