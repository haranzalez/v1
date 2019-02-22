import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        datosBancarios:{
            id: null,
            conductor_id: null,
            titular: null,
            tipo_de_id: null,
            numero_cuenta_bancaria: null,
            tipo_cuenta_bancaria: null,
            banco: null,
            cuenta_propia: false,
        },
        loadingDatosBancariosConductorTable: false,
        datosBancariosList: null,
        headings: [],   
    },

    actions: {
        fetchDatosBancariosList({state, commit, dispatch, rootState}){
            commit('setLoadingDatosBancariosConductorTable', true)
            HTTP().local.get('api/datos-bancarios-conductor/'+rootState.conductores.conductor.id)
            .then(d => {
                commit('setDatosBancariosList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingDatosBancariosConductorTable', false)
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
                commit('setLoadingDatosBancariosConductorTable', false)
            })
        },
        fetchDatosBancarios({commit, dispatch}, id){
            HTTP().local.get('api/datos-bancarios-conductor-by-id/'+id)
            .then(d => {
                console.log(d.data)
                commit('setFullDatosBancarios', d.data[0])
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
        createDatosBancarios({state, commit, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            commit('setConductorId', rootState.conductores.conductor.id)
            HTTP().local.post('api/datos-bancarios-conductor/create', state.datosBancarios)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Datos bancarios creado.'
                    })
                    dispatch('fetchDatosBancariosList')
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
        editDatosBancarios({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/datos-bancarios-conductor/'+state.datosBancarios.id+'/update', state.datosBancarios)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Datos bancarios actualizados.'
                    })
                    dispatch('fetchDatosBancariosList')
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
        delDatosBancarios({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/datos-bancarios-conductor/'+state.datosBancarios.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Datos bancarios eliminados exitosamente'
                    })
                    dispatch('fetchDatosBancariosList')
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
           
            for(let prop2 in state.datosBancariosList[0]){
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
        setLoadingDatosBancariosConductorTable(state, value){
            state.loadingDatosBancariosConductorTable = value
        },
        setFullDatosBancarios(state, value){
            state.datosBancarios = value
        },
        setDatosBancariosList(state, list){
            state.datosBancariosList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setTitular(state, value){
            state.datosBancarios.titular = value
        },
        setTipoDeId(state, value){
            state.datosBancarios.tipo_de_id = value
        },
        setNumeroCuentaBancaria(state, value){
            state.datosBancarios.numero_cuenta_bancaria = value
        },
        setTipoCuentaBancaria(state, value){
            state.datosBancarios.tipo_cuenta_bancaria = value
        },
        setBanco(state, value){
            state.datosBancarios.banco = value
        },
        setCuentaPropia(state, value){
            state.datosBancarios.cuenta_propia = value
        },
        datosBancariosConductorFormReset(state){
            state.datosBancarios = {
                id: null,
                conductor_id: null,
                titular: null,
                tipo_de_id: null,
                numero_cuenta_bancaria: null,
                tipo_cuenta_bancaria: null,
                banco: null,
                cuenta_propia: false,
            }
        }
    },
};