'use strict'
const CronJob = use('cron').CronJob;
const Helpers = use('Helpers')
const { exec } = use('child_process');
const fs = use('fs');
const readdir = Helpers.promisify(fs.readdir)
const readFile = Helpers.promisify(fs.readFile)

class BackupsController {
    program_backup({ request }){
        const { minute, hour, dayofmonth, month, dayofweek } = request.all()
        var job = minute + ' ' + hour + ' ' + dayofmonth + ' ' + month + ' ' + dayofweek
        console.log(job.toString())
        //*  *  *  *  *  command
        //-  -  -  -  -
        //|  |  |  |  |
        //|  |  |  |  +----- day of week (0 - 6) (Sunday=0)
        //|  |  |  +-------- month (1 - 12)
        //|  |  +----------- day of month (1 - 31)
        //|  +-------------- hour (0 - 23)
        //+----------------- min (0 - 59)
        new CronJob(job.toString(), function() {
            var date = new Date();
            var fileName = 'BU-'+fecha('#DD##MM##YY#-#hhh##mm##ss#', date).toString();
            //exec('ssh root@172.30.10.18 "PGPASSWORD=Hquintero*17 pg_dump -U root -F p -h localhost -c v1" >> /opt/v1/server/backups/'+fileName);
            exec('pg_dump -U haran -F p v1 > /Users/haran/OneDrive/Desktop/workspace/v1/server/Backups/'+fileName, (err, stdout, stderr) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('cron job done')
            });
        }, null, true, 'America/Bogota');

        return 'started'
    }
    program_preset_backup({ request }){
        const { preset } = request.all()
        console.log(preset)
        //*  *  *  *  *  command
        //-  -  -  -  -
        //|  |  |  |  |
        //|  |  |  |  +----- day of week (0 - 6) (Sunday=0)
        //|  |  |  +-------- month (1 - 12)
        //|  |  +----------- day of month (1 - 31)
        //|  +-------------- hour (0 - 23)
        //+----------------- min (0 - 59)
        new CronJob(preset.toString(), function() {
            var date = new Date();
            var fileName = 'BU-'+fecha('#DD##MM##YY#-#hhh##mm##ss#', date).toString();
            //exec('ssh root@172.30.10.18 "PGPASSWORD=Hquintero*17 pg_dump -U root -F p -h localhost -c v1" >> /opt/v1/server/backups/'+fileName);
            exec('pg_dump -U haran -F p v1 > /Users/haran/OneDrive/Desktop/workspace/v1/server/Backups/'+fileName, (err, stdout, stderr) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('cron job done')
            });
        }, null, true, 'America/Bogota');

        return {
            message: 'success'
        }
    }
    async backup(){
        var date = new Date();
        var fileName = 'BU-'+fecha('#DD##MM##YY#-#hhh##mm##ss#', date).toString();
        //exec('ssh root@172.30.10.18 "PGPASSWORD=Hquintero*17 pg_dump -U root -F p -h localhost -c v1" >> /opt/v1/server/backups/'+fileName);
        exec('pg_dump -U haran -F p v1 > /Users/haran/OneDrive/Desktop/workspace/v1/server/Backups/'+fileName, (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(stdout);
        });
       
        return {
            message: 'success'
        }
    }

    async downloadBackup({ request }){
        const { filename } = request.all()
        const file = await readFile('/Users/haran/OneDrive/Desktop/workspace/v1/server/Backups/' + filename)
        return file
    }

    async backups_list(){
        var dta = [];
        var files = await readdir('/Users/haran/OneDrive/Desktop/workspace/v1/server/Backups')
       
        if(files.length !== 0){
            for(let i = 0; i < files.length; i++){
                var f = files[i].split('-');
                var date = f[1];
                var time = f[2];
            
                var date = date.charAt(0)+date.charAt(1)+'/'+date.charAt(2)+date.charAt(3)+'/20'+date.charAt(4)+date.charAt(5)+' '+
                time.charAt(0)+time.charAt(1)+':'+time.charAt(2)+time.charAt(3)+':'+time.charAt(4)+time.charAt(5);

                dta.push({fecha: date, archivo: files[i]});
            }
            
        }else{
            dta.push({mess: 'Aun no se han creado backups.'})
        }
        return dta
           
    }
}

function fecha(formatString, date){
    var fecha = new Date(date);
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    YY = ((YYYY=fecha.getFullYear())+"").slice(-2);
    MM = (M=fecha.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][M-1]).substring(0,3);
    DD = (D=fecha.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"][fecha.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
    h=(hhh=fecha.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=fecha.getMinutes())<10?('0'+m):m;
    ss=(s=fecha.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
  }

module.exports = BackupsController
