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
        viaje:{
            flete: 0,
            anticipo: 0,
            ruta_id: null,
        },
        vehiculo:{
            id: null,
        },
        ruta: {
            id: null,
        },
        consolidacionesList: null,
        selectedViaje: null,
        selectedProducto: null,
        selectedServicio: '',
        dataReady: false,
        headings: [],  
    },
    actions: {
        createConsolidacion({state, commit}){
            if(state.consolidacion.cliente_id != null){
                HTTP().local.get('api/consolidaciones/'+state.consolidacion.cliente_id+'/crear')
                .then(d => {
                    console.log(d.data.pkg)
                    
                    if(d.data.message == 'success'){
                        commit('setFullConsolidacion', d.data.pkg)
                        Notification({
                            type: "info",
                            showClose: true,
                            message: 'Se a creado una nueva consolidacion para el NIT: '+d.data.pkg.cliente.nit+'.'
                        })
                        return true
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                Message({
                    type: "warning",
                    showClose: true,
                    message: 'Porfavor seleccione cliente.'
                })
            }
            
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
       
        fetchConsolidacionesList({commit, dispatch}){
            HTTP().local.get('api/consolidaciones')
            .then(d => {
                commit('setConsolidacionesList', d.data)
                dispatch('renderTableHeadings')
                dispatch('renderSelectedVehiculo')
                dispatch('renderSelectedRuta')
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
            for(let prop2 in state.cuadresList[0]){
                if(prop2 !== 'created_at' || prop2 !== 'updated_at'){
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
            }
            commit('setTableHeadings', pkg)
        },
        renderSelectedRuta({ state, commit }){
            let obj = {}
            for(let prop in state.cuadresList){
                for(let prop2 in state.cuadresList[prop].ruta){
                    obj[state.cuadresList[prop]['ruta'][prop2]['id']] = (state.cuadresList[prop]['ruta'] !== [])
                    ? state.cuadresList[prop]['ruta'][prop2]['nombre_municipio']
                    : ''
                }
            }
            console.log(obj)
            commit('setSelectedRuta', obj)
        },
        renderSelectedVehiculo({ state, commit }){
            let obj = {}

            for(let prop in state.cuadresList){
                for(let prop2 in state.cuadresList[prop].vehiculo){
                    obj[state.cuadresList[prop]['vehiculo'][prop2]['placa']] = (state.cuadresList[prop]['vehiculo'] !== [])
                    ? state.cuadresList[prop]['vehiculo'][prop2]['placa']
                    : ''
                }
            }
            console.log(obj)
            commit('setSelectedVehiculo', obj)
            console.log(state.selectedVehiculo)
        },
        
    },
    mutations: {
        setFullConsolidacion(state, value){
            state.consolidacion = value
        },
        setClienteId(state, value){
            state.consolidacion.cliente_id = value
        },
        
    },

};