import HTTP from '../http';
import router from '../router'
import { Notification, Message, Confirm } from 'element-ui'


export default {
    namespaced: true,
    state: {
        cuadre:{
            id: null,
            cliente_id: null,
            flete: null,
            ruta_id: null,
            anticipo: null,
            vehiculo_id: null,
            ajuste: null,
            debe: null,
        },
        cuadresList: null,
        selectedVehiculo: null,
        selectedRuta: null,
        selectedCreateVehiculo: null,
        selectedCreateRuta: null,
        selectedCreateProducto: null,
        loading: false,
        dataReady: false,
        headings: [],  
    },
    actions: {
        createCuadre({state}, cliente_id){
            HTTP().local.post('api/cuadre-viajes/crear', {
                cliente_id: cliente_id,
                ruta_id: state.selectedCreateRuta,
                vehiculo_id: state.selectedCreateVehiculo,
                flete: state.cuadre.flete,
                anticipo: state.cuadre.anticipo,
                ajuste: state.cuadre.ajuste,
                debe: state.cuadre.debe,
            })
            .then(d => {
                if(d.data.message == 'success'){
                    return true
                }
               
            })
            .catch(err => {
                console.log(err)
            })
        },
        editCuadre({state}){
            HTTP().local.put('api/cuadre-viajes/'+state.cuadre.id+'/update', {
                cliente_id: cliente_id,
                ruta_id: state.selectedCreateRuta,
                vehiculo_id: state.selectedCreateVehiculo,
                flete: state.cuadre.flete,
                anticipo: state.cuadre.anticipo,
                ajuste: state.cuadre.ajuste,
                debe: state.cuadre.debe,
            })
            .then(d => {
                console.log(d)
                Message({
                    showClose: true,
                    typr: "success",
                    message: 'Actualizacion Exitosa.'
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        delCuadre({state}){
            HTTP().local.delete('api/cuadre-viajes/'+state.cuadre.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cuadre eliminado exitosamente'
                    })
                    router.push('/cuadre-viajes')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
       
        fetchCuadresList({commit, dispatch}){
            commit('setLoading', true)
            HTTP().local.get('api/cuadre-viajes')
            .then(d => {
                console.log(d.data)
                commit('setCuadresList', d.data)
                commit('setDataReady', true)
                dispatch('renderTableHeadings')
                dispatch('renderSelectedVehiculo')
                dispatch('renderSelectedRuta')
                commit('setLoading', false)
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
                    ? state.cuadresList[prop]['ruta'][prop2]['nombre_ruta']
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
        setLoading(state, value){
            state.loading = value
        },
        setFullCuadre(state, value){
            state.cuadre = value
        },
        setCuadresList(state, list){
            state.cuadresList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setDataReady(state, ready){
            state.dataReady = ready
        },
        setConsolidacionId(state, value){
            state.cuadre.consolidacion_id = value
        },
        setRutaId(state, value){
            state.cuadre.ruta_id = value
        },
        setFlete(state, value){
            state.cuadre.flete = value
        },
        setAnticipo(state, value){
            state.cuadre.anticipo = value
        },
        setAjuste(state, value){
            state.cuadre.ajuste = value
        },
        setDebe(state, value){
            state.cuadre.debe = value
        },
        setSelectedVehiculo(state, value){
            state.selectedVehiculo = value
        },
        setSelectedRuta(state, value){
            state.selectedRuta = value
        },
        setSelectedCreateVehiculo(state, value){
            state.selectedCreateVehiculo = value
        },
        setSelectedCreateRuta(state, value){
            state.selectedCreateRuta = value
        },
        setSelectedCreateProducto(state, value){
            state.selectedCreateProducto = value
        },
        resetSelections(state){
            state.selectedCreateVehiculo = null;
            state.selectedCreateRuta = null;
            state.selectedCreateProducto = null;
        }
    },

};