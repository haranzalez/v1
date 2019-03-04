import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        contacto:{
            id: null,
            nombre: null,
            celular: null,
            cargo: null,
            cliente_id: null,
        },
        loadingPersonaDeContactoClienteTable: false,
        contactosList: null,
        headings: [],   
    },

    actions: {
        fetchContactosList({state, commit, dispatch, rootState}){
            commit('setLoadingPersonaDeContactoClienteTable', true)
            HTTP().local.get('api/contacto-clientes/'+rootState.clientes.cliente.id)
            .then(d => {
                commit('setContactosList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingPersonaDeContactoClienteTable', false)
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
                commit('setLoadingPersonaDeContactoClienteTable', false)
            })
        },
        fetchContacto({commit, dispatch}, id){
            HTTP().local.get('api/contacto-clientes-by-id/'+id)
            .then(d => {
                console.log(d.data)
                commit('setFullContacto', d.data[0])
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
        createContacto({state, commit, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            commit('setClienteId', rootState.clientes.cliente.id)
            HTTP().local.post('api/contacto-clientes/create', state.contacto)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Contacto creado.'
                    })
                    dispatch('fetchContactosList')
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
        editContacto({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/contacto-clientes/'+state.contacto.id+'/update', state.contacto)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Contacto actualizado.'
                    })
                    dispatch('fetchContactosList')
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
        delContacto({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/contacto-clientes/'+state.contacto.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Contacto eliminado exitosamente'
                    })
                    dispatch('fetchContactosList')
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
           
            for(let prop2 in state.contactosList[0]){
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
        setLoadingPersonaDeContactoClienteTable(state, value){
            state.loadingPersonaDeContactoClienteTable = value
        },
        setFullContacto(state, value){
            state.contacto = value
        },
        setContactosList(state, list){
            state.contactosList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setNombre(state, value){
            state.contacto.nombre = value
        },
        setCelular(state, value){
            state.contacto.celular = value
        },
        setCargo(state, value){
            state.contacto.cargo = value
        },
        setClienteId(state, value){
            state.contacto.cliente_id = value
        },
        contactoClienteFormReset(state){
            state.contacto = {
                id: null,
                nombre: null,
                celular: null,
                cargo: null,
                cliente_id: null,
            }
        }
    },
};