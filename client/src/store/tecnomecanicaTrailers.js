import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        tecnomecanica:{
            id: null,
            numero_tecnomecanica: null,
            fecha_de_vencimiento: null,
            trailer_id: null,
        },
        loadingTecnomecanicaTrailerTable: false,
        tecnomecanicaList: null,
        headings: [],   
    },

    actions: {
        fetchTecnomecanicaList({state, commit, dispatch, rootState}){
            commit('setLoadingTecnomecanicaTrailerTable', true)
            HTTP().local.get('api/tecnomecanica-trailer/'+rootState.trailers.trailer.id)
            .then(d => {
                commit('setTecnomecanicaList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingTecnomecanicaTrailerTable', false)
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
                commit('setLoadingTecnomecanicaTrailerTable', false)
            })
        },
        fetchTecnomecanica({commit, dispatch}, id){
            HTTP().local.get('api/tecnomecanica-trailer-record-by-id/'+id)
            .then(d => {
                console.log(d.data)
                commit('setFullTecnomecanica', d.data[0])
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
            })
        },
        createTecnomecanica({state, commit, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            commit('setTrailerId', rootState.trailers.trailer.id)
            HTTP().local.post('api/tecnomecanica-trailer/create', state.tecnomecanica)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Tecnomecanica creada.'
                    })
                    dispatch('fetchTecnomecanicaList')
                    load.close()
                }else{
                    Notification.warning({
                        title: 'Atencion!',
                        message: d.data.message,
                        position: 'bottom-right',
                    });
                    load.close()
                }
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
                load.close()
            })
        },
        editTecnomecanica({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/tecnomecanica-trailer/'+state.tecnomecanica.id+'/update', state.tecnomecanica)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Tecnicomecanica actualizada.'
                    })
                    dispatch('fetchTecnomecanicaList')
                    load.close()
                }
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
                load.close()
            })
        },
        delTecnomecanica({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/tecnomecanica-trailer/'+state.tecnomecanica.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Tecnicomecanica eliminada exitosamente'
                    })
                    dispatch('fetchTecnomecanicaList')
                }
                load.close()
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
                load.close()
            })
        },
      
        renderTableHeadings({state, commit}){
            let pkg = []
           
            for(let prop2 in state.tecnomecanicaList[0]){
                if(prop2 !== 'created_at' || prop2 !== 'updated_at'){
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
                
            }
            
            commit('setTableHeadings', pkg)
        },

    },
    mutations: {
        setLoadingTecnomecanicaTrailerTable(state, value){
            state.loadingTecnomecanicaTrailerTable = value
        },
        setFullTecnomecanica(state, value){
            state.tecnomecanica = value
        },
        setTecnomecanicaList(state, list){
            state.tecnomecanicaList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setNumeroTecnomecanica(state, value){
            state.tecnomecanica.numero_tecnomecanica = value
        },
        setFechaDeVencimiento(state, value){
            state.tecnomecanica.fecha_de_vencimiento = value
        },
        setTrailerId(state, value){
            state.tecnomecanica.trailer_id = value
        },
        tecnomecanicaTrailerFormReset(state){
            state.tecnomecanica = {
                id: null,
                numero_tecnomecanica: null,
                fecha_de_vencimiento: null,
                trailer_id: null,
            }
        }
    },
};