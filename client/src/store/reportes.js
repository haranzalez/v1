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
        fieldData: [],
        selectedTable: '',
        selectedField: '',
        filtro: '',
        currentReportFields: [],
        comentarios: '',
        titulo: 'Titulo',
    },

    actions: {
        fetchTables({state, commit, dispatch}){
            HTTP().local.get('api/reports/tables')
            .then(d => {
                commit('setTablesList', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchFields({state, commit, dispatch}){
            HTTP().local.get('api/reports/fields/'+state.selectedTable)
            .then(d => {
                commit('setFieldsList', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchTableFieldsData({state, commit, dispatch}){
            HTTP().local.post('api/reports-field-data', {table: state.selectedTable, field: state.selectedField})
            .then(d => {
                console.log(d.data)
                commit('setFieldData', d.data)
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
       },
       setSelectedField(state, value){
           state.selectedField = value
       },
       setFieldData(state, value){
        state.fieldData.push(value) 
       },
       setFiltro(state, value){
           state.filtro = value
       },
       setComments(state, value){
            state.comentarios = value
       },
       setTitle(state, value){
            state.titulo = value
       },
       setCurrentReportFields(state){
           state.currentReportFields.push(state.selectedField)
       },
       clearCurrentReportFields(state){
            state.currentReportFields = []
       },
       clearFieldData(state){
        state.fieldData = []
       }
    },
};