import HTTP from '../http'
import router from '../router'
import { Notification, Message } from 'element-ui'
import TableServices from '../services/TableServices'

export default {
    namespaced: true,
    state: {
        loggerList: null,
        loadingLoggerTable: false,
        headings: null,
    },
    actions: {
      
        fetchLoggerList({ commit }){
            commit('setLoadingLoggerTable', true)
            HTTP().local.get('/api/logger')
            .then(res => {
               console.log(res.data)
               commit('setTableHeadings', res.data[0])
               commit('setLoggerList', res.data)
               commit('setLoadingLoggerTable', false)
            }).catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se produjo un error',
                    position: 'bottom-right',
                });
            })
        },
      
    },
    mutations: {
        setLoggerList(state, value){
            state.loggerList = value
        },   
        setTableHeadings(state, value){
            state.headings = TableServices.renderTableHeadings(value)
        },
        setLoadingLoggerTable(state, value){
            state.loadingLoggerTable = value
        },
      
    },
};