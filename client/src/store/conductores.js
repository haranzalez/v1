import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message } from 'element-ui'
import { mapGetters } from 'vuex';

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
            transportadora: null,
        },
        conductoresList: null,
        dataReady: false,
        conductoresDataReady: false,
        headings: [],
    },

    actions: {
        createConductor({state}){
            HTTP().local.post('api/conductores/crear', {
                codigo: state.conductor.codigo,
                tipo_de_identificacion: state.conductor.tipo_de_identificacion,
                cedula: state.conductor.cedula,
                municipio_documento: state.conductor.municipio_documento,
                nombres: state.conductor.nombres,
                primer_apellido: state.conductor.primer_apellido,
                segundo_apellido: state.conductor.segundo_apellido,
                tipo_de_conductor: state.conductor.tipo_de_conductor,
                direccion: state.conductor.direccion,
                municipio: state.conductor.municipio,
                telefono_1: state.conductor.telefono_1,
                telefono_2: state.conductor.telefono_2,
                celular: state.conductor.celular,
                transportadora: state.conductor.transportadora,
            })
            .then(d => {
                Message({
                    showClose: true,
                    message: 'Conductor creado.'
                })
                router.push('/Conductores')
            })
            .catch(err => {
                console.log(err)
            })
        },
        editConductor({state}){
            HTTP().local.put('api/conductores/'+state.conductor.id+'/update', {
                codigo: state.conductor.codigo,
                tipo_de_identificacion: state.conductor.tipo_de_identificacion,
                cedula: state.conductor.cedula,
                municipio_documento: state.conductor.municipio_documento,
                nombres: state.conductor.nombres,
                primer_apellido: state.conductor.primer_apellido,
                segundo_apellido: state.conductor.segundo_apellido,
                tipo_de_conductor: state.conductor.tipo_de_conductor,
                direccion: state.conductor.direccion,
                municipio: state.conductor.municipio,
                telefono_1: state.conductor.telefono_1,
                telefono_2: state.conductor.telefono_2,
                celular: state.conductor.celular,
                transportadora: state.conductor.transportadora,
            })
            .then(d => {
                Message({
                    showClose: true,
                    message: 'Actualizacion exitosa.'
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchConductoresList({commit, dispatch}){
            HTTP().local.get('api/conductores')
            .then(d => {
                commit('setConductorList', d.data)
                commit('setDataReady', true)
                commit('setConductoresDataReady', true)
                dispatch('renderTableHeadings')
            })
            .catch(err => {
                console.log(err)
            })
        },
        delConductor({state}){
            HTTP().local.delete('api/conductores/'+state.conductor.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Conductor eliminado exitosamente'
                    })
                    router.push('/Conductores')
                }
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
        setConductorList(state, list){
            state.conductoresList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setDataReady(state, ready){
            state.dataReady = ready
        },
        setConductoresDataReady(state, ready){
            state.dataReady = ready
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
            state.conductor.transportadora = value
        },
        setFullConductor(state, value){
            state.conductor = value
        },
        
    },

};