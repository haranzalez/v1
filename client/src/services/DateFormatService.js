//UI
import moment  from 'moment'

export default {
    fecha(d){
        d = new Date(d)
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return d.toLocaleDateString('es-ES', options)
    },
    hora(d){
        d = new Date(d)
        return d.toLocaleTimeString('es-ES')
    },
    fechav2(date){
        var formatString = '#DD##MM##YY#-#hhh##mm##ss#'
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
        var fd = formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
        var f = fd.split('-');
        
        var date = f[0];
        var time = f[1];
        console.log(time)
        return date.charAt(0)+date.charAt(1)+'/'+date.charAt(2)+date.charAt(3)+'/20'+date.charAt(4)+date.charAt(5)+' '+
        time.charAt(0)+time.charAt(1)+':'+time.charAt(2)+time.charAt(3)+':'+time.charAt(4)+time.charAt(5);
    }
}