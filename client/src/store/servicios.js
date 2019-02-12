import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        servicio:{
            id: null,
            nombre: null,
            descripcion: null,
            precio: null,
        },
        loadingServiciosTable: false,
        serviciosList: null,
        headings: [],   
    },

    actions: {
        fetchServiciosList({state, commit, dispatch}){
            commit('setLoadingServiciosTable', true)
            HTTP().local.get('api/servicios')
            .then(d => {
                console.log(d.data)
                commit('setServiciosList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingServiciosTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchServicio({commit, dispatch}, id){
            HTTP().local.get('api/servicios/'+id)
            .then(d => {
                console.log(d.data)
                commit('setFullServicio', d.data[0])
            })
            .catch(err => {
                console.log(err)
            })
        },
        createServicio({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.post('api/servicios/crear', {
                id: state.servicio.id,
                nombre: state.servicio.nombre,
                descripcion: state.servicio.descripcion,
                precio: state.servicio.precio,
            })
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Servicio creado.'
                    })
                    dispatch('fetchServiciosList')
                    load.close()
                }
                
               
            })
            .catch(err => {
                console.log(err)
            })
        },
        editServicio({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/servicios/'+state.servicio.id+'/update', {
                id: state.servicio.id,
                nombre: state.servicio.nombre,
                descripcion: state.servicio.descripcion,
                precio: state.servicio.precio,
            })
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Servicio actualizado.'
                    })
                    dispatch('fetchServiciosList')
                    load.close()
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        delServicio({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/servicios/'+state.servicio.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'servicio eliminado exitosamente'
                    })
                    dispatch('fetchServiciosList')
                }
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
      
        renderTableHeadings({state, commit}){
            let pkg = []
           
            for(let prop2 in state.serviciosList[0]){
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
        setLoadingServiciosTable(state, value){
            state.loadingServiciosTable = value
        },
        setFullServicio(state, value){
            state.servicio = value
        },
        setServiciosList(state, list){
            state.serviciosList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setNombreServicio(state, value){
            state.servicio.nombre = value
        },
        setDescripcionServicio(state, value){
            state.servicio.descripcion = value
        },
        setPrecioServicio(state, value){
            state.servicio.precio = value
        },
        servicioReset(state){
            state.servicio = {
                id: null,
                nombre: null,
                descripcion: null,
                precio: null,
            }
        }
    },
};