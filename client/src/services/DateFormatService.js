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
}