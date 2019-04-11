import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Loading, Message } from 'element-ui'

export default {
    namespaced: true,
    state: {
        conductor:{
            codigo: null,
            tipo_de_identificacion: null,
            cedula: null,
            municipio_documento: null,
            nombres: null,
            primer_apellido: null,
            segundo_apellido: null,
            tipo_de_conductor: null,
            direccion: null,
            municipio: null,
            telefono_1: null,
            telefono_2: null,
            celular: null,
            transportadora_id: null,
            radica_rndc: false,
            anticipo: false,
            estado: false,
        },
        radicaRndcSwitchCreate: null,
        radicaRndcSwitchEdit: null,
        conductoresList: null,
        dataReady: false,
        conductoresDataReady: false,
        headings: [],
        loadingConductoresTable: false,
    },

    actions: {
        fetchConductor({state, commit, dispatch}, id){
            HTTP().local.get('api/conductores/'+id)
            .then(d => {
                commit('setFullConductor', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        createConductor({state, commit, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.post('api/conductores/crear', state.conductor)
            .then(d => {
                commit('setFullConductor', d.data)
                commit('setDatosBancariosCreateFormVisible', true)
                Message({
                    showClose: true,
                    message: 'Conductor creado.'
                })
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        editConductor({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/conductores/'+state.conductor.id+'/update', state.conductor)
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
        fetchConductoresList({state, commit, dispatch}){
            commit('setLoadingConductoresTable', true)
            HTTP().local.get('api/conductores')
            .then(d => {
                commit('setConductorList', d.data)
                if(state.conductoresList != null){
                    commit('setDataReady', true)
                    dispatch('renderTableHeadings')
                }
                commit('setLoadingConductoresTable', false)
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        delConductor({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/conductores/'+state.conductor.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Conductor eliminado exitosamente'
                    })
                }
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
            for(let prop2 in state.conductoresList[0]){
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
        setDatosBancariosCreateFormVisible(state, value){
            state.datosBancariosCreateFormVisible = value
        },
        setDatosBancariosEditFormVisible(state, value){
            state.datosBancariosEditFormVisible = value
        },
        setConductorList(state, list){
            state.conductoresList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setTableHeadingsToExport(state, headings){
            state.exportHeadings = headings;
        },
        setDataReady(state, ready){
            state.conductoresDataReady = ready
        },

        setCodigo(state, value){
            state.conductor.codigo = value
        },
        setTipoDeiIdentificacion(state, value){
            state.conductor.tipo_de_identificacion = value
        },
        setCedula(state, value){
            state.conductor.cedula = value
        },
        setMunicipioDocumento(state, value){
            state.conductor.municipio_documento = value
        },
        setNombres(state, value){
            state.conductor.nombres = value
        },
        setPrimerApellido(state, value){
            state.conductor.primer_apellido = value
        },
        setSegundoApellido(state, value){
            state.conductor.segundo_apellido = value
        },
        setTipoDeConductor(state, value){
            state.conductor.tipo_de_conductor = value
        },
        setDireccion(state, value){
            state.conductor.direccion = value
        },
        setMunicipio(state, value){
            state.conductor.municipio = value
        },
        setTelefono1(state, value){
            state.conductor.telefono_1 = value
        },
        setTelefono2(state, value){
            state.conductor.telefono_2 = value
        },
        setCelular(state, value){
            state.conductor.celular = value
        },
        setTransportadora(state, value){
            state.conductor.transportadora_id = value
        },
        setFullConductor(state, value){
            state.conductor = value
        },
        setLoadingConductoresTable(state, value){
            state.loadingConductoresTable = value
        },
        setRadicaRndc(state, value){
            state.conductor.radica_rndc = value
        },
        setAnticipo(state, value){
            state.conductor.anticipo = value
        },
        setEstado(state, value){
            state.conductor.estado = value
        },
        resetConductoresVars(state){
            state.conductor = {
                codigo: null,
                tipo_de_identificacion: null,
                cedula: null,
                municipio_documento: null,
                nombres: null,
                primer_apellido: null,
                segundo_apellido: null,
                tipo_de_conductor: null,
                direccion: null,
                municipio: null,
                telefono_1: null,
                telefono_2: null,
                celular: null,
                transportadora_id: null,
                radica_rndc: false,
                anticipo: false,
                estado: false,
            }
        },

      
        
    },

};