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
        totalRecords: 0,
        page: 1,
    },
    actions: {
        fetchLoggerList({ state, commit }){
            commit('setLoadingLoggerTable', true)
            HTTP().local.get('/api/logger/'+state.page)
            .then(res => {
               commit('setTableHeadings', res.data[0])
               commit('setLoggerList', res.data)
               commit('setLoadingLoggerTable', false)
            }).catch(err => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se produjo un error',
                    position: 'bottom-right',
                });
            })
        },
        fetchNumberOfRecords({ commit }){
            HTTP().local.get('/api/logger-num-of-records')
            .then(res => {
               console.log(res.data)
               commit('setTotalRecords', res.data)
            }).catch(err => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se produjo un error',
                    position: 'bottom-right',
                });
            })
        }
      
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
        setTotalRecords(state, value){
            state.totalRecords = value
        },
        setPage(state, value){
            state.page = value
        }
      
    },
};