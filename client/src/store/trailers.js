import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'
import { mapGetters } from 'vuex';

export default {
    namespaced: true,
    state: {
        trailer:{
            placa: null,
            tipo_de_vehiculo: null,
            tipo_de_configuracion: null,
            tenedor: null,
            modelo: null,
            propietario: null,
            tipo_de_flota: null,
            poseedor: null,
            color: null,
            marca_trailer: null,
            peso: null,
            tipo_carroceria: null,
            estado: null,
            radica_rndc: false,
            cedula_poseedor: null,
            cedula_propietario: null,
            cedula_tenedor: null,
            transportadora_id: null,
        },
        trailersList: null,
        trailersDataReady: false,
        headings: [],   
        loadingTrailersTable: false,
    },

    actions: {
        createTrailer({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.post('api/trailers/crear', state.trailer)
            .then(d => {
                Message({
                    showClose: true,
                    message: 'Trailer creado.'
                })
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        editTrailer({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/trailers/'+state.trailer.id+'/update', state.trailer)
            .then(d => {
                Message({
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
            HTTP().local.delete('api/trailers/'+state.trailer.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Trailer eliminado exitosamente'
                    })
                    router.push('/Trailers')
                }
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchTrailersList({state, commit, dispatch}){
            commit('setLoadingTrailersTable', true)
            HTTP().local.get('api/trailers')
            .then(d => {
                commit('setTrailerList', d.data)
                commit('setDataReady', true)
                dispatch('renderTableHeadings')
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
            for(let prop2 in state.trailersList[0]){
                if(prop2 !== 'created_at' || prop2 !== 'updated_at'){
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
                
            }
            commit('setTableHeadings', pkg)
            commit('setLoadingTrailersTable', false)
        },

    },
    mutations: {
        setFullTrailer(state, value){
            state.trailer = value
        },
        setTrailerList(state, list){
            state.trailersList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setDataReady(state, ready){
            state.trailersDataReady = ready
        },
        setPlaca(state, value){
            state.trailer.placa = value
        },
        setTipoDeVehiculo(state, value){
            state.trailer.tipo_de_vehiculo = value
        },
        setTipoDeConfiguracion(state, value){
            state.trailer.tipo_de_configuracion = value
        },
        setTenedor(state, value){
            state.trailer.tenedor = value
        },
        setModelo(state, value){
            state.trailer.modelo = value
        },
        setPropietario(state, value){
            state.trailer.propietario = value
        },
        setTipoDeFlota(state, value){
            state.trailer.tipo_de_flota = value
        },
        setPoseedor(state, value){
            state.trailer.poseedor = value
        },
        setColor(state, value){
            state.trailer.color = value
        },
        setMarcaTrailer(state, value){
            state.trailer.marca_trailer = value
        },
        setPeso(state, value){
            state.trailer.peso = value
        },
        setTipoCarroceria(state, value){
            state.trailer.tipo_carroceria = value
        },
        setEstado(state, value){
            state.trailer.estado = value
        },
        setRadicaRndc(state, value){
            state.trailer.radica_rndc = value
        },
        setLoadingTrailersTable(state, value){
            state.loadingTrailersTable = value
        },
        setCedulaPropietario(state, value){
            state.trailer.cedula_propietario = value
        },
        setCedulaPoseedor(state, value){
            state.trailer.cedula_poseedor = value
        },
        setCedulaTenedor(state, value){
            state.trailer.cedula_tenedor = value
        },
        setTransportadora(state, value){
            state.trailer.transportadora_id = value
        },
        resetTrailerVars(state, value){
            state.trailer = {
                placa: null,
                tipo_de_vehiculo: null,
                tipo_de_configuracion: null,
                tenedor: null,
                modelo: null,
                propietario: null,
                tipo_de_flota: null,
                poseedor: null,
                color: null,
                marca_trailer: null,
                peso: null,
                tipo_carroceria: null,
                estado: null,
                radica_rndc: false,
                cedula_poseedor: null,
                cedula_propietario: null,
                cedula_tenedor: null,
                transportadora_id: null,
            }
        }
        
        
    },

};