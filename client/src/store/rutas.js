import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Confirm } from 'element-ui'
import { mapGetters } from 'vuex';
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
        },
        municipio: {
            nombre_municipio: null,
            codigo_municipio: null,
        },
        valor_flete_formatted: 0,
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
                comentario: state.ruta.comentario,
                municipio_id: state.ruta.municipio_id,
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
            console.log(state.ruta.id)
            HTTP().local.put('api/rutas/'+state.ruta.id+'/update', {
                kilometros: state.ruta.kilometros,
                anticipo_sugerido: state.ruta.anticipo_sugerido,
                valor_flete: state.ruta.valor_flete,
                municipio_id: state.ruta.municipio_id,
            })
            .then(d => {
                Message({
                    showClose: true,
                    message: 'Actualizacion exitosa.'
                })
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
                dispatch('formatValuesInRutasList', d.data)
                //commit('setRutaList', d.data)
                commit('setDataReady', true)
                dispatch('renderTableHeadings')
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
                if(prop2 !== 'created_at' || prop2 !== 'updated_at'){
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
                
            }
            
            commit('setTableHeadings', pkg)
        },
        post_coment({state}, comentario){
            HTTP().local.post('api/rutas/comentario', {
                ruta_id: state.ruta.id,
                comentario: comentario,
            })
            .then(d => {
                console.log(d)
                Message({
                    showClose: true,
                    message: 'Comentario registrado.'
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        formatValuesInRutasList({commit},data){
            for(let prop in data){
                data[prop]['anticipo_sugerido'] = '$'+formatter.format(parseInt(data[prop]['anticipo_sugerido']))
                data[prop]['valor_flete'] = '$'+formatter.format(parseInt(data[prop]['valor_flete']))
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
            value = (value == '' || value == '$')? '0' : value;
            value = value.replace(/\$/g,'');
            value = value.replace(/\,/g,'');
            const res = formatter.format(parseInt(value));
            state.valor_anticipo_formatted = '$'+res
            state.ruta.anticipo_sugerido = value
        },
        setValorflete(state, value){
            value = (value == '' || value == '$')? '0' : value;
            value = value.replace(/\$/g,'');
            value = value.replace(/\,/g,'');
            const res = formatter.format(parseInt(value));
            state.valor_flete_formatted = '$'+res;
            state.ruta.valor_flete = value;
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
        rutaReset(state, value){
            state.ruta = {
                id: null,
                kilometros: null,
                anticipo_sugerido: null,
                valor_flete: null,
                municipio_id: null,
                comentario: null,
                nombre_municipio: null,
            }
        }
        
    },

};