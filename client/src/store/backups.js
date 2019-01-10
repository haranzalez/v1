import HTTP from '../http'
import router from '../router'
import { Notification, Message } from 'element-ui'
import TableServices from '../services/TableServices'

export default {
    namespaced: true,
    state: {
        backup: {
            fecha: null,
            archivo: null,
        },
        programacion: { 
            minute: '*', 
            hour: '*', 
            dayofmonth: '*', 
            month: '*', 
            dayofweek: '*' 
        },
        preset: null,
        backupsList: null,
        loadingBackupsTable: false,
        headings: null,
    },
    actions: {
        programPresetBackup({ state }){
            HTTP().local.post('/api/program-preset', { preset: state.preset })
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Backup programado'
                    })
                }
            }).catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se produjo un error',
                    position: 'bottom-right',
                });
            })
        },
        downloadBackup({}, filename){
            HTTP().local.post('/api/download-backup', {filename})
            .then(res => {
                console.log(res.data)
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename); //or any other extension
                document.body.appendChild(link);
                link.click();
            }).catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se produjo un error',
                    position: 'bottom-right',
                });
            })
           
        },
        fetchBackupsList({ commit }){
            commit('setLoadingBackupsTable', true)
            HTTP().local.get('/api/backups-list')
            .then(res => {
               console.log(res.data)
               commit('setTableHeadings', res.data[0])
               commit('setBackupsList', res.data)
               commit('setLoadingBackupsTable', false)
            }).catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se produjo un error',
                    position: 'bottom-right',
                });
            })
        },
        backupNow({ dispatch }){
            HTTP().local.get('/api/backup')
            .then(res => {
                if(res.data.message == 'success'){
                    dispatch('fetchBackupsList')
                    Notification.success({
                        title: 'Exito!',
                        message: 'Back up creado',
                        position: 'bottom-right',
                    });
                }
            }).catch(err => {
                console.log(err)
                 Notification.warning({
                    title: 'Atencion!',
                    message: 'Se produjo un error',
                    position: 'bottom-right',
                 });
            })
        }
    },
    mutations: {
        setBackupsList(state, value){
            state.backupsList = value
        },   
        setFullBackup(state, value){
            state.backup = value
        },  
        setTableHeadings(state, value){
            state.headings = TableServices.renderTableHeadings(value)
        },
        setLoadingBackupsTable(state, value){
            state.loadingBackupsTable = value
        },
        //PROGRAMACION
        setPresetProgram(state, value){
            state.preset = value
        },
        setMinute(state, value){
            state.programacion.minute = value
        },
        setHour(state, value){
            state.programacion.hour = value
        },
        setDayofmonth(state, value){
            state.programacion.dayofmonth = value
        },
        setMonth(state, value){
            state.programacion.month = value
        },
        setDayofweek(state, value){
            state.programacion.dayofweek = value
        },
    },
};