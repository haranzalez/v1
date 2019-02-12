import HTTP from '../http';
import router from '../router'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        cuadre:{
            cliente_id: null,
            flete: null,
            ruta_id: null,
            tipo_de_vehiculo: null,
            pago_conductor: null,
            pago_tercero: null,
            pago_cabezote: null,
            tipo_de_negociacion: null,
        },
        cuadresList: null,
        cuadreHistoryList: null,
        loadingCuadreRutaHistoryTable: false,
        selectedRutaForHistoryTable: '',
        selectedVehiculo: null,
        selectedRuta: null,
        selectedVehiculoEdit: null,
        selectedRutaEdit: null,
        selectedCreateVehiculo: null,
        selectedCreateRuta: null,
        selectedCreateProducto: null,
        selectedEditRuta: null,
        dataReady: false,
        headings: [],  
    },
    actions: {
        assign_vehicle({dispatch},value){
            HTTP().local.get('api/cuadre-viajes/'+value.cuadre+'/vehiculo/'+value.e)
            .then(d => {
                if(d.data.message == 'success'){
                    Notification({
                        type: 'success',
                        showClose: true,
                        message: 'Cambio de vehiculo exitoso.'
                    })
                    dispatch('fetchCuadresList')
                }
               
            })
            .catch(err => {
                console.log(err)
            })
        },
        assign_ruta({dispatch},pkg){
            HTTP().local.get('api/cuadre-viajes/'+pkg.cuadre_id+'/ruta/'+pkg.ruta_id)
            .then(d => {
                if(d.data.message == 'success'){
                    Notification({
                        type: 'success',
                        showClose: true,
                        message: 'Cambio de ruta exitoso.'
                    })
                    dispatch('fetchCuadresList')
                }
               
            })
            .catch(err => {
                console.log(err)
            })
        },
        getCuadreRutaHistory({ state, commit, rootState }){
            commit('setLoadingCuadreRutaHistoryTable', true)
            HTTP().local.post('api/cuadre-viajes/history', {
                cliente_id: state.cuadre.cliente_id,
                ruta_id: state.cuadre.ruta_id
            })
            .then(d => {
                console.log(d.data)
                commit('setCuadreRutaHistory', d.data)
                commit('setLoadingCuadreRutaHistoryTable', false)
            })
            .catch(err => {
                console.log(err)
                commit('setLoadingCuadreRutaHistoryTable', false)
            })
        },
        createCuadreRuta({state, commit, dispatch, rootState}, cliente_id){
            var load = Loading.service(rootState.sharedValues.loading_options)
            commit('setClienteId', cliente_id)
            HTTP().local.post('api/cuadre-viajes/crear', state.cuadre)
            .then(d => {
                if(d.data.message == 'success'){
                    dispatch('fetchCuadresRutaList')
                    load.close()
                    return true
                }

               load.close()
            })
            .catch(err => {
                console.log(err)
                load.close()
            })
        },
        editCuadreRuta({state, rootState}, cliente_id){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/cuadre-viajes/'+state.cuadre.id+'/update', state.cuadre)
            .then(d => {
                Message({
                    showClose: true,
                    typr: "success",
                    message: 'Actualizacion Exitosa.'
                })
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        delCuadreRuta({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/cuadre-viajes/'+state.cuadre.id+'/delete')
            .then(d => {
                load.close()
               return d
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadreRuta({state, commit, dispatch},pkg){
       
            HTTP().local.get('api/cuadre-viajes/'+pkg.id)
            .then(d => {
               commit('setFullCuadre', d.data)
               commit('setFlete', d.data.flete)
               dispatch('rutas/fetchRuta', d.data.ruta_id, {root: true})
               dispatch('rutas/fetchFilteredByTipoVehiculoRutasList', state.cuadre.tipo_de_vehiculo, {root: true})
               commit('setRutaId', d.data.ruta_id)
               dispatch('renderSelectedRuta', 'single')
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadresRutaList({commit, dispatch}){

            HTTP().local.get('api/cuadre-viajes')
            .then(d => {
                commit('setCuadresList', d.data)
                commit('setDataReady', true)
                dispatch('renderTableHeadings')
                dispatch('renderSelectedVehiculo', 'multiple')
                dispatch('renderSelectedRuta', 'multiple')

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
        renderSelectedRuta({ state, commit }, type){
            let obj = {}
            if(type == 'multiple'){
                for(let prop in state.cuadresList){
                    obj['r-'+state.cuadresList[prop]['ruta'][0]['id']] = (state.cuadresList[prop]['ruta'] !== [])
                    ? state.cuadresList[prop]['nombre_ruta']
                    : ''
                }
            }
            if(type == 'single'){
                obj['r-'+state.cuadre.id] = state.cuadre['ruta']
            }
            commit('setSelectedRuta', obj)
        },
        renderSelectedVehiculo({ state, commit }, type){
            let obj = {}
            if(type == 'multiple'){
                for(let prop in state.cuadresList){
                    for(let prop2 in state.cuadresList[prop].vehiculo){
                        obj['v-'+state.cuadresList[prop]['vehiculo'][prop2]['placa']] = (state.cuadresList[prop]['vehiculo'] !== [])
                        ? state.cuadresList[prop]['vehiculo'][prop2]['placa']
                        : ''
                    }
                }
            }
            if(type == 'single'){
                obj['v-'+state.cuadre.id] = state.cuadre.placa_vehiculo
            }
            commit('setSelectedVehiculo', obj)
        },
        
    },
    mutations: {
        setClienteId(state, value){
            state.cuadre.cliente_id = value
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
        setSelectedRutaEdit(state, value){
            state.selectedRutaEdit = value
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
        },
        setTipoDeVehiculo(state, value){
            state.cuadre.tipo_de_vehiculo = value
        },
        setPagoConductor(state, value){
            state.cuadre.pago_conductor = value
        },
        setPagoTercero(state, value){
            state.cuadre.pago_tercero = value
        },
        setPagoCabezote(state, value){
            state.cuadre.pago_cabezote = value
        },
        setTipoDeNegociacion(state, value){
            state.cuadre.tipo_de_negociacion = value
        },
        setCuadreRutaHistory(state, value){
            state.cuadreHistoryList = value
        },
        setLoadingCuadreRutaHistoryTable(state, value){
            state.loadingCuadreRutaHistoryTable = value
        },
        setSelectedRutaForHistoryTable(state, value){
            state.selectedRutaForHistoryTable = value
        },
        resetCuadreRuta(state){
            state.cuadre = {
                cliente_id: null,
                flete: null,
                ruta_id: null,
                tipo_de_vehiculo: null,
                pago_conductor: null,
                pago_tercero: null,
                pago_cabezote: null,
                tipo_de_negociacion: null,
            }
        }
    },

};