import HTTP from '../http';
import router from '../router'
import { Notification, Message, Confirm } from 'element-ui'


export default {
    namespaced: true,
    state: {
        cuadre:{
            id: null,
            consolidacion_id: null,
            ruta_id: null,
            flete: null,
            anticipo: null,
            descuento: null,
            ganancia: null,
            debe: null,
        },
        cuadresList: null,
        selectedVehiculo: null,
        selectedRuta: null,
        selectedCreateVehiculo: null,
        selectedCreateRuta: null,
        dataReady: false,
        headings: [],  
    },
    actions: {
        createCuadre({state}, consolidacion_id){
            HTTP().local.post('api/cuadre-viajes/crear', {
                consolidacion_id: consolidacion_id,
                ruta_id: state.selectedCreateRuta,
                vehiculo_id: state.selectedCreateVehiculo,
                flete: state.cuadre.flete,
                anticipo: state.cuadre.anticipo,
            })
            .then(d => {
                Message({
                    showClose: true,
                    message: 'Cuadre creado.'
                })
                router.push('/cuadre-viajes')
            })
            .catch(err => {
                console.log(err)
            })
        },
        editCuadre({state}){
            HTTP().local.put('api/cuadre-viajes/'+state.cuadre.id+'/update', {
                consolidacion_id: state.cuadre.consolidacion_id,
                ruta_id: state.cuadre.ruta_id,
                flete: state.cuadre.flete,
                anticipo: state.cuadre.anticipo,
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
            HTTP().local.get('api/cuadre-viajes')
            .then(d => {
                commit('setCuadresList', d.data)
                commit('setDataReady', true)
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
        
    },

};