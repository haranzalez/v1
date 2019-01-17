import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Confirm } from 'element-ui'
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
        },
        loadingTransportadorasTable: false,
        transportadorasList: null,
        headings: [],
    },

    actions: {
        createTransportadora({state}){
            HTTP().local.post('api/transportadoras/crear', {
                nit: state.transportadora.nit,
                razon_social: state.transportadora.razon_social,
                direccion: state.transportadora.direccion,
                telefono: state.transportadora.telefono,
                contacto: state.transportadora.contacto,
                banco: state.transportadora.banco,
                numero_de_cuenta: state.transportadora.numero_de_cuenta,
                pagos: state.transportadora.pagos,
                anticipo: state.transportadora.anticipo,
                tipo_de_cuenta: state.transportadora.tipo_de_cuenta,
            })
            .then(d => {
                Message({
                    type: 'success',
                    showClose: true,
                    message: 'Transportadora creada.'
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        editTransportadora({state}){
            HTTP().local.put('api/transportadoras/'+state.transportadora.id+'/update', {
                nit: state.transportadora.nit,
                razon_social: state.transportadora.razon_social,
                direccion: state.transportadora.direccion,
                telefono: state.transportadora.telefono,
                contacto: state.transportadora.contacto,
                banco: state.transportadora.banco,
                numero_de_cuenta: state.transportadora.numero_de_cuenta,
                pagos: state.transportadora.pagos,
                anticipo: state.transportadora.anticipo,
                tipo_de_cuenta: state.transportadora.tipo_de_cuenta,
            })
            .then(d => {
                Message({
                    type: 'success',
                    showClose: true,
                    message: 'Actualizacion exitosa.'
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        delTrailer({state}){
            HTTP().local.delete('api/transportadoras/'+state.transportadora.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Transportadora eliminada exitosamente'
                    })
                }
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
            }
        }
        
        
    },

};