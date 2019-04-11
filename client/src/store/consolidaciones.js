import HTTP from '../http';
import router from '../router'
import { Notification, Message, Confirm } from 'element-ui'


export default {
    namespaced: true,
    state: {
        consolidacion:{
            id: null,
            cliente_id: null,
            precio_real: 0,
            descuento: 0,
            precio_final: 0,
        },
        anticipos: {},
        consolidacionesList: null,
        selectedRuta: null,
        selectedProducto: null,
        selectedServicio: [],
        selectedVehiculo: null,
        dataReady: false,
        headings: [],  
        loadingConsolidacionesTable: false,
        dataReady: false,
    },
    actions: {
        setRuta({ state, dispatch }, cuadre_ruta_id){
            HTTP().local.get('api/consolidaciones/'+state.consolidacion.id+'/add-cuadre-ruta/'+cuadre_ruta_id)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cambio exitoso'
                    })
                    dispatch('fetchConsolidacionesList')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        setProducto({ state, dispatch }, cuadre_producto_id){
            HTTP().local.get('api/consolidaciones/'+state.consolidacion.id+'/add-cuadre-producto/'+cuadre_producto_id)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cambio exitoso'
                    })
                    dispatch('fetchConsolidacionesList')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        setServicio({ state, dispatch }){
            HTTP().local.post('api/consolidaciones/'+state.consolidacion.id+'/add-cuadre-servicio', state.selectedServicio)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cambio exitoso'
                    })
                    dispatch('fetchConsolidacionesList')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        setVehiculo({ state, dispatch }, vehiculo_id){
            HTTP().local.get('api/consolidaciones/'+state.consolidacion.id+'/add-vehiculo/'+vehiculo_id)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cambio exitoso'
                    })
                    dispatch('fetchConsolidacionesList')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        
        delConsolidacion({state}){
            HTTP().local.delete('api/consolidaciones/'+state.consolidacion.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Consolidacion eliminado exitosamente'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchConsolidacion({commit, dispatch},id){
            HTTP().local.get('api/consolidaciones/'+id)
            .then(d => {
                console.log(d.data[0])
                commit('setFullConsolidacion', d.data[0])
                dispatch('clientes/fetchClienteConsolidacion', d.data[0].cliente_id, {root: true})
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchConsolidacionesList({commit, dispatch}){
            commit('setDataReady', false)
            commit('setLoadingConsolidacionesTable', true)
            HTTP().local.get('api/consolidaciones')
            .then(d => {
                commit('setConsolidacionesList', d.data)
                dispatch('renderTableHeadings')
                dispatch('renderSelectedRuta')
                commit('setDataReady', true)
                commit('setLoadingConsolidacionesTable', false)
               
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
            for(let prop2 in state.consolidacionesList[0]){
                if(prop2 !== 'created_at' || prop2 !== 'updated_at'){
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
            }
            commit('setTableHeadings', pkg)
        },
        renderSelectedRuta({ state, commit, dispatch }){
            let obj = {}
            for(let prop in state.consolidacionesList){
                obj[state.consolidacionesList[prop].id] = (state.consolidacionesList[prop].ruta !== null)
                ? state.consolidacionesList[prop].ruta.id
                : ''
            }
       
            commit('setSelectedRuta', obj)
            
            dispatch('renderSelectedProducto')
        },
        renderSelectedProducto({ state, commit, dispatch }){
            let obj = {}
           
            for(let prop in state.consolidacionesList){
                obj[state.consolidacionesList[prop].id] = (state.consolidacionesList[prop].producto !== null)
                ? state.consolidacionesList[prop].producto.id
                : ''
            }
            commit('setSelectedProducto', obj)
            dispatch('renderSelectedServicio')
        },
        renderSelectedServicio({ state, commit, dispatch }){
            let obj = {}
            for(let prop in state.consolidacionesList){
                obj[state.consolidacionesList[prop].id] = (state.consolidacionesList[prop].servicio !== null)
                ? state.consolidacionesList[prop].servicio.id
                : ''
            }
            commit('setSelectedServicio', obj)
            dispatch('renderSelectedVehiculo')
        },
        renderSelectedVehiculo({ state, commit, dispatch }){
            let obj = {}
            for(let prop in state.consolidacionesList){
                obj[state.consolidacionesList[prop].id] = (state.consolidacionesList[prop].vehiculo !== null)
                ? state.consolidacionesList[prop].vehiculo.id
                : ''
            }
   
            commit('setSelectedVehiculo', obj)
            
           
        },
        
    },
    mutations: {
        setDataReady(state, value){
            state.dataReady = value
        },
        setTableHeadings(state, value){
            state.headings = value
        },
        setFullConsolidacion(state, value){
            state.consolidacion = value
        },
        setClienteId(state, value){
            state.consolidacion.cliente_id = value
        },
        setConsolidacionesList(state, value){
            state.consolidacionesList = value
        },
        setSelectedProducto(state, value){
            state.selectedProducto = value
        },
        setSelectedServicio(state, value){
            state.selectedServicio = value
        },
        setSelectedRuta(state, value){
            state.selectedRuta = value
        },
        setSelectedVehiculo(state, value){
            state.selectedVehiculo = value
        },
        setLoadingConsolidacionesTable(state, value){
            state.loadingConsolidacionesTable = value
        },
        consolidacionesClearParams(state){
            state.consolidacion = {
                id: null,
                cliente_id: null,
                precio_real: 0,
                descuento: 0,
                precio_final: 0,
            }
        }
    },

};