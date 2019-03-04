import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Confirm, Loading } from 'element-ui'
import { mapGetters } from 'vuex';

export default {
    namespaced: true,
    state: {
        loading_options: {
            lock: true,
            fullscreen: true,
            text: 'Trabajando',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        },
        tipo_licencia_options: [
            {
                value: 'C2',
                label: 'C2'
            }, 
            {
                value: 'C3',
                label: 'C3'
            },
        ],
        tipo_negociacion_options: [
            {
                value: 'Flete X Kg.',
                label: 'Flete X Kg.'
            }, 
            {
                value: 'Flete X Valor.',
                label: 'Flete X Valor.'
            }, 
        ],
        estado_options: [
            {
                value: 'Activo',
                label: 'Activo'
            }, 
            {
                value: 'Desactivo',
                label: 'Desactivo'
            }, 
            {
                value: 'Taller',
                label: 'Taller'
            }, 
        ],
        corroceria_options: [
            {
                value: 'Tanque',
                label: 'Tanque'
            }, 
            {
                value: 'Plancha',
                label: 'Plancha'
            }, 
            {
                value: 'Carroceria',
                label: 'Carroceria'
            }, 
            {
                value: 'Camabaja',
                label: 'Camabaja'
            }, 
        ],
        tipo_de_vehiculo_options: [
            {
                value: 'Tracto Camion',
                label: 'Tracto Camion'
            }, 
            {
                value: 'Doble Troque',
                label: 'Doble Troque'
            }, 
            {
                value: 'Sencillo',
                label: 'Sencillo'
            }, 
            {
                value: 'Turbo',
                label: 'Turbo'
            }, 
            {
                value: 'Camioneta',
                label: 'Camioneta'
            }
        ],
        tipo_de_flota_options: [
            {
                value: 'Propio',
                label: 'Propio'
            }, 
            {
                value: 'Tercero',
                label: 'Tercero'
            }, 
            {
                value: 'Cabezote',
                label: 'Cabezote'
            }, 
            {
                value: 'Fidelizado',
                label: 'Fidelizado'
            }, 
        ],
        tipo_de_configuracion_options: [
            {
                value: '2',
                label: '2'
            }, 
            {
                value: '3',
                label: '3'
            }, 
            {
                value: '4',
                label: '4'
            }, 
            {
                value: '2S1',
                label: '2S1'
            }, 
            {
                value: '2S3',
                label: '2S3'
            }, 
            {
                value: '3S1',
                label: '3S1'
            }, 
            {
                value: '3S2',
                label: '3S2'
            }, 
            {
                value: '3S3',
                label: '3S3'
            }, 
            {
                value: 'R2',
                label: 'R2'
            }, 
            {
                value: '2R2',
                label: '2R2'
            }, 
            {
                value: '2R3',
                label: '2R3'
            }, 
            {
                value: '3R2',
                label: '3R2'
            }, 
            {
                value: '3R3',
                label: '3R3'
            }, 
            {
                value: '4R2',
                label: '4R2'
            }, 
            
        ],
        tipo_de_combustible_options: [
            {
                value: 'Corriente',
                label: 'Corriente'
            }, 
            {
                value: 'Extra',
                label: 'Extra'
            }, 
            {
                value: 'Diesel',
                label: 'Diesel'
            },
        ],
        tipo_de_poliza_options: [
            {
                value: 'SOAT',
                label: 'SOAT'
            }, 
            {
                value: 'Hidrocarburos',
                label: 'Hidrocarburos'
            }, 
        ],
        tipo_de_conductor_options: [
            {
                value: 'Propio',
                label: 'Propio'
            }, 
            {
                value: 'Tercero',
                label: 'Tercero'
            },
        ],
        tipo_de_documento_conductor_options: [
            {
                value: 'Curso de alturas',
                label: 'Curso de alturas'
            }, 
            {
                value: 'Curso de sustancias peligrosas',
                label: 'Curso de sustancias peligrosas'
            },
            {
                value: 'Curso HSE',
                label: 'Curso HSE'
            },
        ],
        tipo_de_cuenta_options: [
            {
                value: 'Ahorros',
                label: 'Ahorros'
            }, 
            {
                value: 'Corriente',
                label: 'Corriente'
            },
        ],
        tipo_de_id_options: [
            {
                value: 'NIT',
                label: 'NIT'
            }, 
            {
                value: 'Cedula',
                label: 'Cedula'
            },
        ],
        marcas_vehiculos_options: null,
        marcas_semiremolques_options: null,
        colores_vehiculos_options: null,
        linea_cabezotes_options: null,
        municipios_options: null,
        tipo_carroceria_options: null,
        tipoCarroceriaListLoading: false,
        lineaVehiculoListLoading: false,
        coloresVehiculoListLoading: false,
        marcasVehiculoListLoading: false,
        marcasSemiRemolquesListLoading: false,
        municipiosListLoading: false,
    },

    actions: {
        searchMarcasSemiRemolquesList({state, commit, dispatch}, keyword){
            
            if(keyword !== ''){
                commit('setMarcasSemiRemolquesListLoading', true)
                HTTP().local.post('api/marcas-semiremolques',{keyword})
                .then(d => {
                    commit('setMarcasSemiRemolquesList', d.data)
                    commit('setMarcasSemiRemolquesListLoading', false)
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                commit('setMarcasSemiRemolquesList', null)
            }
            
        },
        searchMunicipios({state, commit, dispatch}, keyword){
            
            if(keyword !== ''){
                commit('setMunicipiosListLoading', true)
                HTTP().local.post('api/municipios-by-keyword',{keyword})
                .then(d => {
                    commit('setMunicipiosList', d.data)
                    commit('setMunicipiosListLoading', false)
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                commit('setMarcasVehiculosList', null)
            }
            
        },
        searchMarcasVehiculosList({state, commit, dispatch}, keyword){
            
            if(keyword !== ''){
                commit('setMarcasVehiculoListLoading', true)
                HTTP().local.post('api/marcas-vehiculos',{keyword})
                .then(d => {
                    commit('setMarcasVehiculosList', d.data)
                    commit('setMarcasVehiculoListLoading', false)
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                commit('setMarcasVehiculosList', null)
            }
            
        },
        searchColoresVehiculosList({state, commit, dispatch}, keyword){
            if(keyword !== ''){
                commit('setColoresVehiculoListLoading', true)
                HTTP().local.post('api/colores-vehiculos', {keyword})
                .then(d => {
                    commit('setColoresVehiculosList', d.data)
                    commit('setColoresVehiculoListLoading', false)
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                commit('setColoresVehiculosList', null)
            }
        },
        searchLineaVehiculosList({state, commit, dispatch}, keyword){
            if(keyword !== ''){
                commit('setLineaVehiculoListLoading', true)
                HTTP().local.post('api/lineas-vehiculos',{keyword})
                .then(d => {
                    commit('setLineaVehiculosList', d.data)
                    commit('setLineaVehiculoListLoading', false)
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                commit('setLineaVehiculosList', null)
            }
        },
        searchTipoCarroceria({state, commit, dispatch}, keyword){
            if(keyword !== ''){
                commit('setTipoCarroceriaListLoading', true)
                HTTP().local.post('api/tipo-carroceria',{keyword})
                .then(d => {
                    commit('setTipoCarroceriaList', d.data)
                    commit('setTipoCarroceriaListLoading', false)
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                commit('setTipoCarroceriaList', null)
            }
        },
    },
    mutations: {
        setMunicipiosList(state, value){
            state.municipios_options = value
        },
        setMunicipiosListLoading(state, value){
            state.municipiosListLoading = value
        },
        setLineaVehiculoListLoading(state, value){
            state.lineaVehiculoListLoading = value
        },
        setColoresVehiculoListLoading(state, value){
            state.coloresVehiculoListLoading = value
        },
        setMarcasVehiculoListLoading(state, value){
            state.marcasVehiculoListLoading = value
        },
        setMarcasSemiRemolquesListLoading(state, value){
            state.marcasSemiRemolquesListLoading = value
        },
        setTipoCarroceriaListLoading(state, value){
            state.tipoCarroceriaListLoading = value
        },
        setMarcasVehiculosList(state, value){
            state.marcas_vehiculos_options = value
        },
        setMarcasSemiRemolquesList(state, value){
            state.marcas_semiremolques_options = value
        },
        setTipoCarroceriaList(state, value){
            state.tipo_carroceria_options = value
        },
        setColoresVehiculosList(state, value){
            state.colores_vehiculos_options = value
        },
        setLineaVehiculosList(state, value){
            state.linea_cabezotes_options = value
        },
    },

};