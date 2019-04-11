import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        aseguradora:{
            id: null,
            nit: null,
            nombre: null,
        },
        loadingAseguradorasTable: false,
        aseguradorasList: null,
        headings: [],   
    },

    actions: {
        fetchAseguradorasList({state, commit, dispatch}){
            commit('setLoadingAseguradorasTable', true)
            HTTP().local.get('api/aseguradoras')
            .then(d => {
                console.log(d.data)
                commit('setAseguradorasList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingAseguradorasTable', false)
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
        fetchAseguradora({commit, dispatch}, id){
            HTTP().local.get('api/aseguradoras/'+id)
            .then(d => {
                console.log(d.data)
                commit('setFullAseguradora', d.data[0])
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
        createAseguradora({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.post('api/aseguradoras/create', state.aseguradora)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Aseguradora creada.'
                    })
                    dispatch('fetchAseguradorasList')
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
            })
        },
        editAseguradora({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/aseguradoras/'+state.aseguradora.id+'/update', state.aseguradora)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Aseguradora actualizada.'
                    })
                    dispatch('fetchAseguradorasList')
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
            })
        },
        delAseguradora({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/aseguradoras/'+state.aseguradora.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Aseguradora eliminada exitosamente'
                    })
                    dispatch('fetchAseguradorasList')
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
            })
        },
      
        renderTableHeadings({state, commit}){
            let pkg = []
           
            for(let prop2 in state.aseguradorasList[0]){
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
        setLoadingAseguradorasTable(state, value){
            state.loadingAseguradorasTable = value
        },
        setFullAseguradora(state, value){
            state.aseguradora = value
        },
        setAseguradorasList(state, list){
            state.aseguradorasList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setNombreAseguradora(state, value){
            state.aseguradora.nombre = value
        },
        setNitAseguradora(state, value){
            state.aseguradora.nit = value
        },
        aseguradoraReset(state){
            state.aseguradora = {
                id: null,
                nit: null,
                nombre: null,
            }
        }
    },
};