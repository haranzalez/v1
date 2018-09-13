import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification } from 'element-ui'
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
            radica_rndc: null,
        },
        trailersList: null,
        dataReady: false,
        headings: [],   
    },

    actions: {
        fetchTrailersList({commit, dispatch}){
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
        },

    },
    mutations: {
        setTrailerList(state, list){
            state.trailersList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setDataReady(state, ready){
            state.dataReady = ready
        },
        
        
    },

};