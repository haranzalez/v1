import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Confirm } from 'element-ui'
import { mapGetters } from 'vuex';
import NumbersService from '../services/NumberFormattingService'
const formatter = new Intl.NumberFormat({
    style: 'currency',
})

export default {
    namespaced: true,
    state: {
        ruta:{
            id: null,
            kilometros: 0,
            anticipo_sugerido: 0,
            valor_flete: 0,
            municipio_id: null,
            comentario: null,
            nombre_municipio: null,
            departamento: null,
            pago_conductor_HQ: null,
            pago_tercero: null,
            pago_cabezote: null,
            municipio_origen_id: null,
            municipio_destino_id: null,
        },
        municipio_origen: {
            nombre_municipio: null,
            codigo_municipio: null,
        },
        municipio_destino: {
            nombre_municipio: null,
            codigo_municipio: null,
        },
        valor_flete_formatted: 0,
        pago_conductor_formatted: 0,
        pago_tercero_formatted: 0,
        pago_cabezote_formatted: 0,
        valor_anticipo_formatted: 0,
        comentarios_list: null,
        rutasList: null,
        municipios_list: null,
        dataReady: false,
        headings: [],   
    },

    actions: {
        create_municipio({ state }){
            HTTP().local.post('api/municipios/crear', {
                nombre_municipio: state.municipio.nombre_municipio,
                codigo_dane: state.municipio.codigo_municipio,
                departamento: state.municipio.departamento,
            })
            .then(d => {
                if(d.data.message == "success"){
                    Message({
                        showClose: true,
                        message: 'Municipio creado.'
                    })
                    return true
                }
                return false
                
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        createRuta({state}){
            HTTP().local.post('api/rutas/crear', {
                kilometros: state.ruta.kilometros,
                anticipo_sugerido: state.ruta.anticipo_sugerido,
                valor_flete: state.ruta.valor_flete,
                pago_conductor_HQ: state.ruta.pago_conductor_HQ,
                pago_tercero: state.ruta.pago_tercero,
                pago_cabezote: state.ruta.pago_cabezote,
                municipio_destino_id: state.ruta.municipio_destino_id,
                municipio_origen_id: state.ruta.municipio_origen_id,
            })
            .then(d => {
                if(d.data.message == "success"){
                    Message({
                        showClose: true,
                        message: 'Ruta creada.'
                    })
                    return true
                }
                return false
                
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        editRuta({state}){
            HTTP().local.put('api/rutas/'+state.ruta.id+'/update', {
                kilometros: state.ruta.kilometros,
                anticipo_sugerido: state.ruta.anticipo_sugerido,
                valor_flete: state.ruta.valor_flete,
                pago_conductor_HQ: state.ruta.pago_conductor_HQ,
                pago_tercero: state.ruta.pago_tercero,
                pago_cabezote: state.ruta.pago_cabezote,
                municipio_destino_id: state.ruta.municipio_destino_id,
                municipio_origen_id: state.ruta.municipio_origen_id,
            })
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Actualizacion exitosa.'
                    })
                }
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        delRuta({state}){
            HTTP().local.delete('api/rutas/'+state.ruta.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Ruta eliminada exitosamente'
                    })
                    router.push('/Rutas')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchRutasList({commit, dispatch}){
            HTTP().local.get('api/rutas')
            .then(d => {
                console.log(d.data)
                dispatch('formatValuesInRutasList', d.data)
                //commit('setRutaList', d.data)
                commit('setDataReady', true)
                dispatch('renderTableHeadings')
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchRuta({commit, dispatch}, id){
            HTTP().local.get('api/rutas/'+id)
            .then(d => {
                console.log(d.data)
                commit('setFullRuta', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchComments({state, commit}){
            HTTP().local.get('api/rutas/comentario/'+state.ruta.id)
            .then(d => {
                console.log(d.data)
                commit('setComentariosList', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchMunicipios({commit}){
            HTTP().local.get('api/municipios')
            .then(d => {
                commit('setMunicipiosList', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
           
            for(let prop2 in state.rutasList[0]){
                console.log(prop2)
                if(prop2 != 'comentario'){
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
                
            }
            
            commit('setTableHeadings', pkg)
        },
        post_coment({state, dispatch}, comentario){
            HTTP().local.post('api/rutas/comentario', {
                ruta_id: state.ruta.id,
                comentario: comentario,
            })
            .then(d => {
                
                Message({
                    showClose: true,
                    message: 'Comentario registrado.'
                })
                dispatch('fetchComments')
            })
            .catch(err => {
                console.log(err)
            })
        },
        formatValuesInRutasList({commit},data){
            for(let prop in data){
                data[prop]['anticipo_sugerido'] = '$'+formatter.format(parseInt(data[prop]['anticipo_sugerido']))
                data[prop]['valor_flete'] = '$'+formatter.format(parseInt(data[prop]['valor_flete']))
                data[prop]['pago_conductor_HQ'] = '$'+formatter.format(parseInt(data[prop]['pago_conductor_HQ']))
                data[prop]['pago_tercero'] = '$'+formatter.format(parseInt(data[prop]['pago_tercero']))
                data[prop]['pago_cabezote'] = '$'+formatter.format(parseInt(data[prop]['pago_cabezote']))
            }
            console.log(data)
            commit('setRutaList', data)
        },
    },
    mutations: {
        setFullRuta(state, value){
            console.log(value)
            state.ruta = value
        },
        setRutaList(state, list){
            state.rutasList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setDataReady(state, ready){
            state.dataReady = ready
        },
        setKilometros(state, value){
            state.ruta.kilometros = value
        },
        setAnticipoSugerido(state, value){
            state.valor_anticipo_formatted = '$'+NumbersService.formatToCurrency(value);
            state.ruta.anticipo_sugerido = value
        },
        setValorflete(state, value){
            state.valor_flete_formatted = '$'+NumbersService.formatToCurrency(value);
            state.ruta.valor_flete = value;
        },
        setPagoConductor(state, value){
            state.pago_conductor_formatted = '$'+NumbersService.formatToCurrency(value);
            state.ruta.pago_conductor_HQ = value
        },
        setPagoTercero(state, value){
            state.pago_tercero_formatted = '$'+NumbersService.formatToCurrency(value);
            state.ruta.pago_tercero = value
        },
        setPagoCabezote(state, value){
            state.pago_cabezote_formatted = '$'+NumbersService.formatToCurrency(value);
            state.ruta.pago_cabezote = value
        },
        setComentario(state, value){
            state.ruta.comentario = value
        },
        setMunicipioId(state, value){
            state.ruta.municipio_id = value
        },
        setMunicipiosList(state, value){
            state.municipios_list = value
        },
        setComentariosList(state, value){
            state.comentarios_list = value
        },
        setMunicipioName(state, value){
            state.municipio.nombre_municipio = value
        },
        setCodigoMunicipio(state, value){
            state.municipio.codigo_municipio = value
        },
        setDepartamentoName(state, value){
            state.municipio.departamento = value
        },
        setMunicipioOrigenId(state, value){
            console.warn(value)
            state.ruta.municipio_origen_id = value
        },
        setMunicipioDestinoId(state, value){
            state.ruta.municipio_destino_id = value
        },
        rutaReset(state, value){
            state.ruta = {
                id: null,
                kilometros: 0,
                anticipo_sugerido: 0,
                valor_flete: 0,
                municipio_id: null,
                comentario: null,
                nombre_municipio: null,
                departamento: null,
                pago_conductor_HQ: null,
                pago_tercero: null,
                pago_cabezote: null,
                municipio_origen_id: null,
                municipio_destino_id: null,
            }
        }
        
    },

};