import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification } from 'element-ui'
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
        headings: [],   
    },

    actions: {
        fetchConductoresList({commit, dispatch}){
            HTTP().local.get('api/conductores')
            .then(d => {
                console.log(d.data)
                commit('setConductorList', d.data)
                commit('setDataReady', true)
                dispatch('renderTableHeadings')
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
           
            for(let prop2 in state.conductoresList[0]){
                console.log(prop2)
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
        
    },

};