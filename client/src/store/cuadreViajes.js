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
        selectedVehiculoEdit: null,
        selectedRutaEdit: null,
        selectedCreateVehiculo: null,
        selectedCreateRuta: null,
        selectedCreateProducto: null,
        selectedEditRuta: null,
        loading: false,
        loadingForm: false,
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
        editCuadre({state}, cliente_id){
            HTTP().local.put('api/cuadre-viajes/'+state.cuadre.id+'/update', {
                cliente_id: cliente_id,
                ruta_id: state.selectedRutaEdit,
                vehiculo_id: state.selectedVehiculoEdit,
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
               return d
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadre({commit, dispatch},pkg){
            commit('setLoading', true)
            HTTP().local.get('api/cuadre-viajes/'+pkg.id)
            .then(d => {
               commit('setFullCuadre', d.data)
               commit('setFlete', d.data.flete)
               commit('rutas/setValorflete', d.data.valor_flete.toString(), {root: true})
               commit('setSelectedRutaEdit', d.data.ruta_id)
               commit('setSelectedVehiculoEdit', d.data.vehiculo_id)
               dispatch('renderSelectedRuta', 'single')
               commit('setLoading', false)
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
                dispatch('renderSelectedVehiculo', 'multiple')
                dispatch('renderSelectedRuta', 'multiple')
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
           
          
            console.log(obj)
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
            console.log(obj)
            commit('setSelectedVehiculo', obj)
        },
        
    },
    mutations: {
        setLoadingForm(state, value){
            state.loadingForm = value
        },
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
        setSelectedVehiculoEdit(state, value){
            state.selectedVehiculoEdit = value
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
        resetCuadreRuta(state){
            state.cuadre = {
                id: null,
                cliente_id: null,
                flete: null,
                ruta_id: null,
                anticipo: null,
                vehiculo_id: null,
                ajuste: null,
                debe: null,
            }
        }
    },

};