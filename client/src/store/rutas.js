import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'
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
            tipo_de_vehiculo: null,
        },
        municipio_origen: {
            nombre_municipio: null,
            codigo_municipio: null,
        },
        municipio_destino: {
            nombre_municipio: null,
            codigo_municipio: null,
        },
        loadingRutasTable: false,
        valor_flete_formatted: 0,
        pago_conductor_formatted: 0,
        pago_tercero_formatted: 0,
        pago_cabezote_formatted: 0,
        valor_anticipo_formatted: 0,
        comentarios_list: null,
        rutasList: null,
        filteredRutasList: null,
        municipios_list: null,
        dataReady: false,
        headings: [],   
    },

    actions: {
        create_municipio({ state, rootState }){
            var load = Loading.service(rootState.sharedValues.loading_options)
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
                load.close()
                return false
                
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        createRuta({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.post('api/rutas/crear', state.ruta)
            .then(d => {
                if(d.data.message == "success"){
                    Message({
                        showClose: true,
                        message: 'Ruta creada.'
                    })
                    return true
                }
                load.close()
                return false
                
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        editRuta({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/rutas/'+state.ruta.id+'/update', state.ruta)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Actualizacion exitosa.'
                    })
                }
                load.close()
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        delRuta({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/rutas/'+state.ruta.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Ruta eliminada exitosamente'
                    })
                }
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchFilteredByTipoVehiculoRutasList({commit}, filter){
            HTTP().local.get('api/rutas/'+filter+'/filter')
            .then(d => {
               commit('setFilteredByTipoVehiculoRutasList', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchRutasList({commit, dispatch}){
            commit('setLoadingRutasTable', true)
            HTTP().local.get('api/rutas')
            .then(d => {
                dispatch('formatValuesInRutasList', d.data)
                commit('setDataReady', true)
                dispatch('renderTableHeadings')
                commit('setLoadingRutasTable', false)
            })
            .catch(err => {
                commit('setLoadingRutasTable', false)
                console.log(err)
            })
        },
        fetchRuta({commit, dispatch}, id){
            HTTP().local.get('api/rutas/'+id)
            .then(d => {
                commit('setFullRuta', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchComments({state, commit}){
            HTTP().local.get('api/rutas/comentario/'+state.ruta.id)
            .then(d => {

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
 
                if(prop2 == 'comentario' || prop2 == 'created_at' || prop2 == 'updated_at' 
                || prop2 == 'comentarios'
                || prop2 == 'nombre_ruta'
                || prop2 == 'municipios'
                || prop2 == 'municipio_origen_id'
                || prop2 == 'municipio_destino_id'){
                    continue;
                }else{
                    if(prop2 == 'nombre_municipio_origen' || prop2 == 'nombre_municipio_destino'){
                        prop2 = prop2.split('_')
                        prop2 = prop2[2]
                        prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                        pkg.push(prop2)
                    }else{
                        prop2 = prop2.split('_').join(' ')
                        prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                        pkg.push(prop2)
                    }
                   
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
            commit('setRutaList', data)
        },
    },
    mutations: {
        setFullRuta(state, value){
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
            state.ruta.municipio_origen_id = value
        },
        setMunicipioDestinoId(state, value){
            state.ruta.municipio_destino_id = value
        },
        setFilteredByTipoVehiculoRutasList(state, value){
            state.filteredRutasList = value
        },
        setTipoDeVehiculo(state, value){
            state.ruta.tipo_de_vehiculo = value
        },
        setLoadingRutasTable(state, value){
            state.loadingRutasTable = value
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
                pago_conductor_HQ: 0,
                pago_tercero: 0,
                pago_cabezote: 0,
                municipio_origen_id: null,
                municipio_destino_id: null,
                tipo_de_vehiculo: null,
            }
        }
        
    },

};