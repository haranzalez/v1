import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'
import { mapGetters } from 'vuex';

export default {
    namespaced: true,
    state: {
        tablesList: [],
        fieldsList: [],
        selectedTable: '',

    },

    actions: {
        fetchTables({state, commit, dispatch}){
           
            HTTP().local.get('api/reports/tables')
            .then(d => {
                console.log(d.data)
                commit('setTablesList', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchFields({state, commit, dispatch}){
            HTTP().local.get('api/reports/fields/'+selectedTable)
            .then(d => {
                console.log(d.data)
                commit('setFieldsList', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    mutations: {
       setTablesList(state, value){
           state.tablesList = value
       },
       setFieldsList(state, value){
        state.fieldsList = value
       },
       setSelectedTable(state, value){
           state.selectedTable = value
       }
    },
};