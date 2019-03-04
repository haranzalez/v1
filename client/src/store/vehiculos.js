import HTTP from '../http';
import router from '../router'
import { Notification, Message, Confirm, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        vehiculo:{
            placa: null,
            numero_chasis: null,
            tipo_de_vehiculo: null,
            tipo_configuracion: null,
            tipo_de_carroceria: null,
            numero_de_ejes: null,
            modelo: null,
            numero_motor: null,
            tipo_de_flota: null,
            marca_cabezote: null,
            linea_cabezote: null,
            tipo_de_combustible: null,
            color: null,
            peso: null,
            capasidad_carga: null,
            radica_rndc: false,
            propietario: null,
            tenedor: null,
            cedula_propietario: null,
            cedula_tenedor: null,
            digito_de_verificacion_tenedor: null,
            digito_de_verificacion_propietario: null,
            tipo_de_id_propietario: 'NIT',
            tipo_de_id_tenedor: 'NIT',
            transportadora_id: null,
            estado: null,
        },
        vehiculosList: null,
        selectedConductor: null,
        selectedTrailer: null,
        vehiculosDataReady: false,
        headings: [], 
        loadingVehiculosTable: false, 
    },
    actions: {
        createVehiculo({state, dispatch, rootState }){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.post('api/vehiculos/crear', state.vehiculo)
            .then(d => {
                Message({
                    type: 'success',
                    showClose: true,
                    message: 'Vehiculo creado.'
                })
                dispatch('assignConductor')
                dispatch('assignTrailer')
                dispatch('fetchVehiculosList')
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        editVehiculo({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/vehiculos/'+state.vehiculo.id+'/update', state.vehiculo)
            .then(d => {
                Message({
                    type: 'success',
                    showClose: true,
                    message: 'Actualizacion Exitosa.'
                })
                dispatch('assignConductor')
                dispatch('assignTrailer')
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        delVehiculo({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/vehiculos/'+state.vehiculo.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Vehiculo eliminado exitosamente'
                    })
                    dispatch('fetchVehiculosList')
                    load.close()
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        assignConductor({state}){
            HTTP().local.get('api/vehiculos/'+state.vehiculo.id+'/assign/conductor/'+state.selectedConductor)
            .then(d => {
               console.log('Conductor asignado')
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        assignTrailer({state, dispatch}){
            HTTP().local.get('api/vehiculos/'+state.vehiculo.id+'/assign/trailer/'+state.selectedTrailer)
            .then(d => {
                if(d.data.message == 'success'){
                    console.log('Trailer asignado')
                    dispatch('fetchVehiculosList')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchVehiculosList({commit, dispatch}){
            commit('setLoadingVehiculosTable', true)
            HTTP().local.get('api/vehiculos')
            .then(d => {
                console.log(d.data)
                commit('setVehiculosList', d.data)
                dispatch('renderTableHeadings')
                commit('setDataReady', true)
                commit('setLoadingVehiculosTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchVehiculo({commit}, id){
            HTTP().local.get('api/vehiculos/'+id)
            .then(d => {
                commit('setFullVehiculo', d.data[0])
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

    },
    mutations: {
        setFullVehiculo(state, value){
            state.vehiculo = value
            state.selectedConductor = (value.conductor === null)?null:value.conductor.id
            state.selectedTrailer = (value.trailer === null)?null:value.trailer.id
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
        },
        setRadicaRndc(state, value){
            state.vehiculo.radica_rndc = value
        },
        setPoseedor(state, value){
            state.vehiculo.poseedor = value
        },
        setPropietario(state, value){
            state.vehiculo.propietario = value
        },
        setTenedor(state, value){
            state.vehiculo.tenedor = value
        },
        setCedulaPropietario(state, value){
            state.vehiculo.cedula_propietario = value
        },
        setCedulaTenedor(state, value){
            state.vehiculo.cedula_tenedor = value
        },
        setTransportadora(state, value){
            state.vehiculo.transportadora_id = value
        },
        setTipoDeCarroceria(state, value){
            state.vehiculo.tipo_de_carroceria = value
        },
        setEstado(state, value){
            state.vehiculo.estado = value
        },
        setNumeroDeEjes(state, value){
            state.vehiculo.numero_de_ejes = value
        },
        setSelectedTrailer(state, value){
            state.selectedTrailer = value
        },
        setSelectedConductor(state, value){
            state.selectedConductor = value
        },
        setDigitoDeVerificacionTenedor(state, value){
            state.vehiculo.digito_de_verificacion_tenedor = value
        },
        setDigitoDeVerificacionPropietario(state, value){
            state.vehiculo.digito_de_verificacion_propietario = value
        },
        setTipoDeIdPropietario(state, value){
            state.vehiculo.tipo_de_id_propietario = value
        },
        setTipoDeIdTenedor(state, value){
            state.vehiculo.tipo_de_id_tenedor = value
        },
        resetVehicleVariables(state){
            state.vehiculo = {
                placa: null,
                numero_chasis: null,
                tipo_de_vehiculo: null,
                tipo_configuracion: null,
                tipo_de_carroceria: null,
                numero_de_ejes: null,
                modelo: null,
                numero_motor: null,
                tipo_de_flota: null,
                marca_cabezote: null,
                linea_cabezote: null,
                tipo_de_combustible: null,
                color: null,
                peso: null,
                capasidad_carga: null,
                radica_rndc: false,
                propietario: null,
                tenedor: null,
                cedula_propietario: null,
                cedula_tenedor: null,
                digito_de_verificacion_tenedor: null,
                digito_de_verificacion_propietario: null,
                tipo_de_id_propietario: 'NIT',
                tipo_de_id_tenedor: 'NIT',
                transportadora_id: null,
                estado: null,
            }
            state.selectedConductor = null
            state.selectedTrailer = null
        }
        
    },

};