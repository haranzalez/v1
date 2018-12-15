import HTTP from '../http';
import router from '../router'
import { Notification, Message, Confirm } from 'element-ui'


export default {
    namespaced: true,
    state: {
        vehiculo:{
            placa: null,
            numero_chasis: null,
            tipo_de_vehiculo: null,
            tipo_configuracion: null,
            modelo: null,
            numero_motor: null,
            tipo_de_flota: null,
            marca_cabezote: null,
            linea_cabezote: null,
            tipo_de_combustible: null,
            color: null,
            peso: null,
            capasidad_carga: null
        },
        vehiculosList: null,
        selectedConductor: null,
        selectedTrailer: null,
        vehiculosDataReady: false,
        headings: [], 
        assignVehicleId: null, 
        loadingVehiculosTable: false, 
    },
    actions: {
        createVehiculo({state, dispatch}){
            HTTP().local.post('api/vehiculos/crear', {
                placa: state.vehiculo.placa,
                numero_chasis: state.vehiculo.numero_chasis,
                tipo_de_vehiculo: state.vehiculo.tipo_de_vehiculo,
                tipo_configuracion: state.vehiculo.tipo_configuracion,
                modelo: state.vehiculo.modelo,
                numero_motor: state.vehiculo.numero_motor,
                tipo_de_flota: state.vehiculo.tipo_de_flota,
                marca_cabezote: state.vehiculo.marca_cabezote,
                linea_cabezote: state.vehiculo.linea_cabezote,
                tipo_de_combustible: state.vehiculo.tipo_de_combustible,
                color: state.vehiculo.color,
                peso: state.vehiculo.peso,
                capasidad_carga: state.vehiculo.capasidad_carga,
            })
            .then(d => {
                Message({
                    type: 'success',
                    showClose: true,
                    message: 'Vehiculo creado.'
                })
                dispatch('fetchVehiculosList')
            })
            .catch(err => {
                console.log(err)
            })
        },
        editVehiculo({state, dispatch}){
            HTTP().local.put('api/vehiculos/'+state.vehiculo.id+'/update', {
                placa: state.vehiculo.placa,
                numero_chasis: state.vehiculo.numero_chasis,
                tipo_de_vehiculo: state.vehiculo.tipo_de_vehiculo,
                tipo_configuracion: state.vehiculo.tipo_configuracion,
                modelo: state.vehiculo.modelo,
                numero_motor: state.vehiculo.numero_motor,
                tipo_de_flota: state.vehiculo.tipo_de_flota,
                marca_cabezote: state.vehiculo.marca_cabezote,
                linea_cabezote: state.vehiculo.linea_cabezote,
                tipo_de_combustible: state.vehiculo.tipo_de_combustible,
                color: state.vehiculo.color,
                peso: state.vehiculo.peso,
                capasidad_carga: state.vehiculo.capasidad_carga,
            })
            .then(d => {
                console.log(d)
                Message({
                    type: 'success',
                    showClose: true,
                    message: 'Actualizacion Exitosa.'
                })
                dispatch('fetchVehiculosList')
            })
            .catch(err => {
                console.log(err)
            })
        },
        delVehiculo({state, dispatch}){
            HTTP().local.delete('api/vehiculos/'+state.vehiculo.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Vehiculo eliminado exitosamente'
                    })
                    dispatch('fetchVehiculosList')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        assignConductor({state, dispatch},e){
            HTTP().local.get('api/vehiculos/'+state.assignVehicleId+'/assign/conductor/'+e)
            .then(d => {
                console.log(d)
                Message({
                    showClose: true,
                    message: 'Cambio de Conductor exitoso!'
                })
                dispatch('fetchVehiculosList')
                dispatch('renderSelectedConductores')
            })
            .catch(err => {
                console.log(err)
            })
        },
        assignTrailer({state, dispatch},e){
            console.log(state.assignVehicleId)
            HTTP().local.get('api/vehiculos/'+state.assignVehicleId+'/assign/trailer/'+e)
            .then(d => {
                Message({
                    showClose: true,
                    message: 'Cambio de Trailer exitoso!.'
                })
                dispatch('fetchVehiculosList')
                dispatch('renderSelectedTrailers')
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchVehiculosList({commit, dispatch}, resource){
            commit('setLoadingVehiculosTable', true)
            HTTP().local.get('api/vehiculos')
            .then(d => {
                console.log(d.data)
                commit('setVehiculosList', d.data)
                if(resource == null){
                    dispatch('renderSelectedConductores')
                    dispatch('renderSelectedTrailers')
                    dispatch('renderTableHeadings')
                }
                commit('setDataReady', true)
                commit('setLoadingVehiculosTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchVehiculo({commit}, resource){
            HTTP().local.get('api/vehiculos/'+resource.id)
            .then(d => {
                commit('setFullVehiculo', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
            for(let prop2 in state.vehiculosList[0]){
                if(prop2 !== 'created_at' || prop2 !== 'updated_at'){
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
            }
            commit('setTableHeadings', pkg)
        },
        renderSelectedConductores({ state, commit }){
            let obj = {}
            for(let prop in state.vehiculosList){
                obj[state.vehiculosList[prop]['placa']] = (state.vehiculosList[prop]['conductor'] !== null)?state.vehiculosList[prop]['conductor']['nombres']:''
            }
            commit('setSelectedConductorList', obj)
        },
        renderSelectedTrailers({ state, commit }){
            let obj = {}
            for(let prop in state.vehiculosList){
                obj[state.vehiculosList[prop]['placa']] = (state.vehiculosList[prop]['trailer'] !== null)?state.vehiculosList[prop]['trailer']['placa'] : ''
            }
            commit('setSelectedTrailersList', obj) 
        },
    },
    mutations: {
        setFullVehiculo(state, value){
            state.vehiculo = value
        },
        setVehiculosList(state, list){
            state.vehiculosList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setDataReady(state, ready){
            state.vehiculosDataReady = ready
        },
        setSelectedConductorList(state, list){
            state.selectedConductor = list
        },
        setSelectedTrailersList(state, list){
            state.selectedTrailer = list
        },
        setVehicleId(state, id){
            state.assignVehicleId = id
        },
        setPlaca(state, value){
            state.vehiculo.placa = value
        },
        setNumeroChasis(state, value){
            state.vehiculo.numero_chasis = value
        },
        setTipoDeVehiculo(state, value){
            state.vehiculo.tipo_de_vehiculo = value
        },
        setTipoConfiguracion(state, value){
            state.vehiculo.tipo_configuracion = value
        },
        setModelo(state, value){
            state.vehiculo.modelo = value
        },
        setNumeroMotor(state, value){
            state.vehiculo.numero_motor = value
        },
        setTipoDeFlota(state, value){
            state.vehiculo.tipo_de_flota = value
        },
        setMarcaCabezote(state, value){
            state.vehiculo.marca_cabezote = value
        },
        setLineaCabezote(state, value){
            state.vehiculo.linea_cabezote = value
        },
        setTipoDeCombustible(state, value){
            state.vehiculo.tipo_de_combustible = value
        },
        setColor(state, value){
            state.vehiculo.color = value
        },
        setPeso(state, value){
            state.vehiculo.peso = value
        },
        setCapasidadCarga(state, value){
            state.vehiculo.capasidad_carga = value
        },
        setLoadingVehiculosTable(state, value){
            state.loadingVehiculosTable = value
        }
        
    },

};