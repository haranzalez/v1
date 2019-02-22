import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'
import { mapGetters } from 'vuex';

export default {
    namespaced: true,
    state: {
        transportadora:{
            nit: null,
            razon_social: null,
            direccion: null,
            telefono: null,
            contacto: null,
            banco: null,
            numero_de_cuenta: null,
            pagos: false,
            anticipo: false,
            radica_rndc: false,
        },
        loadingTransportadorasTable: false,
        transportadorasList: null,
        headings: [],
    },

    actions: {
        createTransportadora({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.post('api/transportadoras/crear', state.transportadora)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Transportadora creada.'
                    })
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
            })
        },
        editTransportadora({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/transportadoras/'+state.transportadora.id+'/update', state.transportadora)
            .then(d => {
                Message({
                    type: 'success',
                    showClose: true,
                    message: 'Actualizacion exitosa.'
                })
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        delTrailer({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/transportadoras/'+state.transportadora.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Transportadora eliminada exitosamente'
                    })
                }
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchTransportadorasList({state, commit, dispatch}){
            commit('setLoadingTransportadorasTable', true)
            HTTP().local.get('api/transportadoras')
            .then(d => {
                commit('setTransportadorasList', d.data)
                dispatch('renderTableHeadings')
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
            for(let prop2 in state.transportadorasList[0]){
                if(prop2 !== 'created_at' || prop2 !== 'updated_at'){
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
                
            }
            
            commit('setTableHeadings', pkg)
            commit('setLoadingTransportadorasTable', false)
        },

    },
    mutations: {
        setFullTransportadora(state, value){
            state.transportadora = value
        },
        setTransportadorasList(state, list){
            state.transportadorasList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setNit(state, value){
            state.transportadora.nit = value
        },
        setRazonSocial(state, value){
            state.transportadora.razon_social = value
        },
        setDireccion(state, value){
            state.transportadora.direccion = value
        },
        setTelefono(state, value){
            state.transportadora.telefono = value
        },
        setContacto(state, value){
            state.transportadora.contacto = value
        },
        setBanco(state, value){
            state.transportadora.banco = value
        },
        setNumeroDeCuenta(state, value){
            state.transportadora.numero_de_cuenta = value
        },
        setPagos(state, value){
            state.transportadora.pagos = value
        },
        setAnticipo(state, value){
            state.transportadora.anticipo = value
        },
        setTipoDeCuenta(state, value){
            state.transportadora.tipo_de_cuenta = value
        },
        setRadicaRndc(state, value){
            state.transportadora.radica_rndc = value
        },
        setLoadingTransportadorasTable(state, value){
            state.loadingTransportadorasTable = value
        },
        resetTransportadoraVars(state){
            state.transportadora = {
                nit: null,
                razon_social: null,
                direccion: null,
                telefono: null,
                contacto: null,
                banco: null,
                numero_de_cuenta: null,
                pagos: false,
                anticipo: false,
                tipo_de_cuenta: null,
                radica_rndc: false,
            }
        }
        
        
    },

};