import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        licencia:{
           id: null,
           conductor_id: null,
           numero_de_licencia: null,
           categoria: null,
           fecha_de_vencimiento: null
        },
        loadingLicenciasConductoresTable: false,
        licenciasList: null,
        headings: [],   
    },

    actions: {
        fetchLicenciasList({state, commit, dispatch, rootState}){
            commit('setLoadingLicenciasConductorTable', true)
            HTTP().local.get('api/licencias-conductor/'+rootState.conductores.conductor.id)
            .then(d => {
                console.log(d.data)
                commit('setLicenciasList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingLicenciasConductorTable', false)
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
                commit('setLoadingLicenciasConductorTable', false)
            })
        },
        fetchLicencia({commit, dispatch}, id){
            HTTP().local.get('api/licencia-conductor-by-id/'+id)
            .then(d => {
                console.log(d.data)
                commit('setFullLicencia', d.data[0])
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
        createLicencia({state, commit, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            commit('setConductorId', rootState.conductores.conductor.id)
            HTTP().local.post('api/licencias-conductor/create', state.licencia)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'licencia creada.'
                    })
                    dispatch('fetchLicenciasList')
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
        editLicencia({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/licencias-conductor/'+state.licencia.id+'/update', state.licencia)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Licencia actualizada.'
                    })
                    dispatch('fetchLicenciasList')
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
        delLicencia({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/licencias-conductor/'+state.licencia.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Licencia eliminada exitosamente'
                    })
                    dispatch('fetchLicenciasList')
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
           
            for(let prop2 in state.licenciasList[0]){
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
        setLoadingLicenciasConductorTable(state, value){
            state.loadingLicenciasConductorTable = value
        },
        setFullLicencia(state, value){
            state.licencia = value
        },
        setLicenciasList(state, list){
            state.licenciasList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setNumeroDeLicencia(state, value){
            state.licencia.numero_de_licencia = value
        },
        setCategoria(state, value){
            state.licencia.categoria = value
        },
        setFechaDeVencimiento(state, value){
            state.licencia.fecha_de_vencimiento = value
        },
        setConductorId(state, value){
            state.licencia.conductor_id = value
        },
        licenciaConductorFormReset(state){
            state.licencia = {
                id: null,
                conductor_id: null,
                numero_de_licencia: null,
                categoria: null,
                fecha_de_vencimiento: null
            }
        }
    },
};