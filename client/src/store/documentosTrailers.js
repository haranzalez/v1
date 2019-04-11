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
            trailer_id: null,
        },
        loadingDocumentosTrailerTable: false,
        documentosList: null,
        headings: [],   
    },

    actions: {
        fetchDocumentosList({state, commit, dispatch, rootState}){
            commit('setLoadingDocumentosTrailerTable', true)
            HTTP().local.get('api/documentos-trailer/'+rootState.trailers.trailer.id)
            .then(d => {
                console.log(d.data)
                commit('setDocumentosList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingDocumentosTrailerTable', false)
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
                commit('setLoadingDocumentosTrailerTable', false)
            })
        },
        fetchDocumento({commit, dispatch}, id){
            HTTP().local.get('api/documento-trailer-by-id/'+id)
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
            commit('settrailerId', rootState.trailers.trailer.id)
            HTTP().local.post('api/documentos-trailer/create', state.documento)
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
            HTTP().local.put('api/documentos-trailer/'+state.documento.id+'/update', state.documento)
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
            HTTP().local.delete('api/documentos-trailer/'+state.documento.id+'/delete')
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
        setLoadingDocumentosTrailerTable(state, value){
            state.loadingDocumentostrailerTable = value
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
        settrailerId(state, value){
            state.documento.trailer_id = value
        },
        documentoTrailerFormReset(state){
            state.documento = {
                id: null,
                aseguradora_id: null,
                tipo_de_poliza: null,
                numero_de_poliza: null,
                fecha_de_vencimiento: null,
                trailer_id: null,
            }
        }
    },
};