import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        documento:{
            id: null,
            aseguradora_id: null,
            tipo_de_poliza: null,
            numero_de_poliza: null,
            fecha_de_vencimiento: null,
            vehiculo_id: null,
        },
        loadingDocumentosVehiculoTable: false,
        documentosList: null,
        headings: [],   
    },

    actions: {
        fetchDocumentosList({state, commit, dispatch, rootState}){
            commit('setLoadingDocumentosVehiculoTable', true)
            HTTP().local.get('api/documentos-vehiculo/'+rootState.vehiculos.vehiculo.id)
            .then(d => {
                console.log(d.data)
                commit('setDocumentosList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingDocumentosVehiculoTable', false)
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
        fetchDocumento({commit, dispatch}, id){
            HTTP().local.get('api/documento/'+id)
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
            commit('setVehiculoId', rootState.vehiculos.vehiculo.id)
            HTTP().local.post('api/documentos-vehiculo/create', state.documento)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Documento creado.'
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
            })
        },
        editDocumento({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/documentos-vehiculo/'+state.documento.id+'/update', state.documento)
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
            })
        },
        delDocumento({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/documentos-vehiculo/'+state.documento.id+'/delete')
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
        setLoadingDocumentosVehiculoTable(state, value){
            state.loadingDocumentosVehiculoTable = value
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
        setAseguradoraId(state, value){
            state.documento.aseguradora_id = value
        },
        setTipoDePoliza(state, value){
            state.documento.tipo_de_poliza = value
        },
        setNumeroDePoliza(state, value){
            state.documento.numero_de_poliza = value
        },
        setFechaDeVencimiento(state, value){
            state.documento.fecha_de_vencimiento = value
        },
        setVehiculoId(state, value){
            state.documento.vehiculo_id = value
        },
        documentoFormReset(state){
            state.documento = {
                id: null,
                aseguradora_id: null,
                tipo_de_poliza: null,
                numero_de_poliza: null,
                fecha_de_vencimiento: null,
                vehiculo_id: null,
            }
        }
    },
};