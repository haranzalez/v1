import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        documento:{
            id: null,
            institucion: null,
            tipo_de_documento: null,
            fecha_inicio: null,
            fecha_fin: null,
            conductor_id: null,
        },
        loadingDocumentosConductorTable: false,
        documentosList: null,
        headings: [],   
    },

    actions: {
        fetchDocumentosList({state, commit, dispatch, rootState}){
            commit('setLoadingDocumentosConductorTable', true)
            HTTP().local.get('api/documentos-Conductor/'+rootState.conductores.conductor.id)
            .then(d => {
                commit('setDocumentosList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingDocumentosConductorTable', false)
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
                commit('setLoadingDocumentosConductorTable', false)
            })
        },
        fetchDocumento({commit, dispatch}, id){
            HTTP().local.get('api/documento-conductor-by-id/'+id)
            .then(d => {
                console.log(d.data)
                commit('setFullDocumento', d.data[0])
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
        createDocumento({state, commit, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            commit('setConductorId', rootState.conductores.conductor.id)
            HTTP().local.post('api/documentos-conductor/create', state.documento)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Documento creado.'
                    })
                    dispatch('fetchDocumentosList')
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
        editDocumento({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/documentos-conductor/'+state.documento.id+'/update', state.documento)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Documento actualizado.'
                    })
                    dispatch('fetchDocumentosList')
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
        delDocumento({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/documentos-conductor/'+state.documento.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Documento eliminado exitosamente'
                    })
                    dispatch('fetchDocumentosList')
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
           
            for(let prop2 in state.documentosList[0]){
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
        setLoadingDocumentosConductorTable(state, value){
            state.loadingDocumentosConductorTable = value
        },
        setFullDocumento(state, value){
            state.documento = value
        },
        setDocumentosList(state, list){
            state.documentosList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setTipoDeDocumento(state, value){
            state.documento.tipo_de_documento = value
        },
        setFechaInicio(state, value){
            state.documento.fecha_inicio = value
        },
        setFechaFin(state, value){
            state.documento.fecha_fin = value
        },
        setInstitucion(state, value){
            state.documento.institucion = value
        },
        setConductorId(state, value){
            state.documento.conductor_id = value
        },
        documentoConductorFormReset(state){
            state.documento = {
                id: null,
                institucion: null,
                tipo_de_documento: null,
                fecha_inicio: null,
                fecha_fin: null,
                conductor_id: null,
            }
        }
    },
};