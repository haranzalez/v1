import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Confirm } from 'element-ui'
import { mapGetters } from 'vuex';

export default {
    namespaced: true,
    state: {
        cliente:{
           id: null,
           nombre_razon_social: null,
           nit: null,
           direccion: null,
           ciudad: null,
           email: null,
           telefono: null,
           celular: null,
           persona_de_contacto: null,
           direccion_envio_de_factura: null,
           contrato: null,
           cupo: null,
           dias: null,
           created_at: null,
           radica_rndc: false,
        },
        deposito: {
            id: null,
            cliente_id: null,
            cantidad: null,
            fecha_deposito: null,
        },
        depositoTableLoading: false,
        depositosList: null,
        depositosEditFormVisible: false,
        depositosCreateFormVisible: false,
        depositoTotal: 0,
        dataready:false,
        clienteConsolidacion:null,
        clientesList: null,
        cuadreRutasList: null,
        cuadreProductosList: null,
        cuadreServiciosList: null,
        dataReady: false,
        loadingClientesTable: false,
        loadingCuadreRutaTable: false,
        loadingCuadreProductoTable: false,
        loadingCuadreServicioTable: false,
        loadingConsolidacionTableBtnsPkg: null,
        currentCuadresTab: 'Rutas',
        headings: [], 
        selectedContrato: '',
        selectedDias: '', 
        contratoOptions: [
            {
                value: 'Mandato',
                label: 'Mandato'
            }, 
            {
                value: 'Contrato',
                label: 'Contrato'
            },
            {
                value: 'Factura',
                label: 'Factura'
            },
            {
                value: 'Contado',
                label: 'Contado'
            },
            
        ],
        diasOptions: [
            {
                value: '5 dias',
                label: '5 dias'
            }, 
            {
                value: '8 dias',
                label: '8 dias'
            }, 
            {
                value: '15 dias',
                label: '15 dias'
            }, 
            {
                value: '30 dias',
                label: '30 dias'
            }, 
            {
                value: '45 dias',
                label: '45 dias'
            }, 
            {
                value: '60 dias',
                label: '60 dias'
            }, 
        ] 
    },

    actions: {
        fetchCuadresRutas({state, commit}, id){
            console.log(id)
            commit('setLoadingCuadreRutaTable', true)
            id = (id)?id:state.cliente.id
            HTTP().local.get('api/clientes/'+id+'/cuadre-viajes')
            .then(d => {
                console.log(d.data[0])
                commit('setCuadreRutasList', d.data)
                commit('setLoadingCuadreRutaTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadresProductos({state, commit}, id){
            commit('setLoadingCuadreProductoTable', true)
            id = (id)?id:state.cliente.id
            HTTP().local.get('api/clientes/'+id+'/cuadre-productos')
            .then(d => {
                console.log(d.data)
                commit('setCuadreProductosList', d.data)
                commit('setLoadingCuadreProductoTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadresServicios({state, commit}, id){
            commit('setLoadingCuadreServicioTable', true)
            id = (id)?id:state.cliente.id
            HTTP().local.get('api/clientes/'+id+'/cuadre-servicios')
            .then(d => {
                console.log(d.data)
                commit('setCuadreServiciosList', d.data)
                commit('setLoadingCuadreServicioTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        create_consolidacion({ state }){
            HTTP().local.get('api/consolidaciones/'+state.cliente.id+'/crear')
            .then(d => {
                if(d.data.message == "success"){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Consolidacion creada.'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        createCliente({state, dispatch}){
            HTTP().local.post('api/clientes/crear', {
                nombre_razon_social: state.cliente.nombre_razon_social,
                nit: state.cliente.nit,
                direccion: state.cliente.direccion,
                ciudad: state.cliente.ciudad,
                email: state.cliente.email,
                telefono: state.cliente.telefono,
                celular: state.cliente.celular,
                persona_de_contacto: state.cliente.persona_de_contacto,
                direccion_envio_de_factura: state.cliente.direccion_envio_de_factura,
                contrato: state.cliente.contrato,
                cupo: state.cliente.cupo,
                dias: state.cliente.dias,
            })
            .then(d => {
                if(d.data.message == "success"){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cliente creado.'
                    })
                    dispatch('fetchClientesList')
                }
                return false
            })
            .catch(err => {
                console.log(err)
            })
        },
        editCliente({state, dispatch}){
            HTTP().local.put('api/clientes/'+state.cliente.id+'/update', {
                nombre_razon_social: state.cliente.nombre_razon_social,
                nit: state.cliente.nit,
                direccion: state.cliente.direccion,
                ciudad: state.cliente.ciudad, 
                email: state.cliente.email,
                telefono: state.cliente.telefono,
                celular: state.cliente.celular,
                persona_de_contacto: state.cliente.persona_de_contacto,
                direccion_envio_de_factura: state.cliente.direccion_envio_de_factura,
                contrato: state.cliente.contrato,
                cupo: state.cliente.cupo,
                dias: state.cliente.dias,
            })
            .then(d => {
                Message({
                    type: 'success',
                    showClose: true,
                    message: 'Actualizacion exitosa.'
                })
                dispatch('fetchClientesList')
            })
            .catch(err => {
                console.log(err)
            })
        },
        delCliente({state, dispatch}){
            HTTP().local.delete('api/clientes/'+state.cliente.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cliente eliminado exitosamente'
                    })
                    dispatch('fetchClientesList')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchClienteConsolidacion({commit, dispatch}, id){
            console.log(id)
            HTTP().local.get('api/clientes/'+id)
            .then(d => {
                commit('setFullCliente', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCliente({commit, dispatch}, id){
            console.log(id)
            HTTP().local.get('api/clientes/'+id)
            .then(d => {
                commit('setFullCliente', d.data)
                dispatch('fetchCuadresRutas')
                dispatch('fetchCuadresProductos')
                dispatch('fetchCuadresServicios')
                dispatch('fetchDepositos')
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchClientesList({commit, dispatch}){
            commit('setLoadingClientesTable', true)
            HTTP().local.get('api/clientes')
            .then(d => {
                commit('setClientesList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingClientesTable', false)
                commit('setDataready', true)
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
            for(let prop2 in state.clientesList[0]){
                if(prop2 == 'created_at' || prop2 == 'updated_at'){
                    continue;
                }else{
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
            }
            commit('setTableHeadings', pkg)
        },
//==============================================================================//
//=============================== DEPOSITOS ACTIONS ====================================//
//==============================================================================//
        fetchDepositos({ state, commit, dispatch }){
            commit('setDepositoTableLoading', true)
            HTTP().local.get('api/clientes/'+state.cliente.id+'/depositos')
            .then(d => {
                commit('setDepositosList', d.data)
                commit('setDepositoTableLoading', false)
                dispatch('calculateBalace')
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchDeposito({ state, commit }, deposito_id){
            HTTP().local.get('api/clientes/'+state.cliente.id+'/depositos/'+deposito_id)
            .then(d => {
                commit('setFullDeposito', d.data[0])
            })
            .catch(err => {
                console.log(err)
            })
        },
        create_deposito({ state }){
            HTTP().local.post('api/clientes/'+state.cliente.id+'/createDeposito', state.deposito)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Deposito creado'
                    })
                }
               
            })
            .catch(err => {
                console.log(err)
            })
        },
        update_deposito({ state }){
            HTTP().local.put('api/clientes/'+state.cliente.id+'/updateDeposito/'+state.deposito.id, state.deposito)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Deposito actualizado'
                    })
                }
               
            })
            .catch(err => {
                console.log(err)
            })
        },
        calculateBalace({ state, commit }){
            commit('setDepositoTotal', 0)
            var balance = 0
            for(let prop in state.depositosList){
                balance += state.depositosList[prop].cantidad
            }

            commit('setDepositoTotal', balance)
        }
    },
    mutations: {
        setLoadingCuadreRutaTable(state, value){
            state.loadingCuadreRutaTable = value
        },
        setLoadingCuadreProductoTable(state, value){
            state.loadingCuadreProductoTable = value
        },
        setLoadingCuadreServicioTable(state, value){
            state.loadingCuadreServicioTable = value
        },
        setLoadingClientesTable(state, value){
            state.loadingClientesTable = value
        },
        setRadicaRndc(state, value){
            state.cliente.radica_rndc = value
        },
        setFullCliente(state, value){
            state.cliente = value
        },
        setCuadreRutasList(state, list){
            state.cuadreRutasList = list
        },
        setCuadreProductosList(state, list){
            state.cuadreProductosList = list
        },
        setCuadreServiciosList(state, list){
            state.cuadreServiciosList = list
        },
        setClientesList(state, list){
            state.clientesList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setDataReady(state, ready){
            state.dataReady = ready
        },
        setNombreRazonSocial(state, value){
            state.cliente.nombre_razon_social = value
        },
        setNit(state, value){
            state.cliente.nit = value
        },
        setDireccion(state, value){
            state.cliente.direccion = value
        },
        setCiudad(state, value){
            state.cliente.ciudad = value
        },
        setEmail(state, value){
            state.cliente.email = value
        },
        setTelefono(state, value){
            state.cliente.telefono = value
        },
        setCelular(state, value){
            state.cliente.celular = value
        },
        setPersonaDeContacto(state, value){
            state.cliente.persona_de_contacto = value
        },
        setDireccionEnvioDeFactura(state, value){
            state.cliente.direccion_envio_de_factura = value
        },
        setSelectedContrato(state, value){
            state.cliente.contrato = value
        },
        setSelectedDias(state, value){
            state.cliente.dias = value
        },
        setCupo(state, value){
            state.cliente.cupo = value
        },
        setCelular(state, value){
            state.cliente.celular = value
        },
        setCurrentCuadresTab(state, value){
            state.currentCuadresTab = value
        },
        paramsReset(state){
            state.cliente = {
                id: null,
                nombre_razon_social: null,
                nit: null,
                direccion: null,
                ciudad: null,
                email: null,
                telefono: null,
                celular: null,
                persona_de_contacto: null,
                direccion_envio_de_factura: null,
                tipo_contrato: null,
                created_at: null,
                contrato: null,
                dias: null,
                radica_rndc: false,
                anticipo: false,
            }
        },
        setFullCLienteConsolidacion(state, value){
            state.clienteConsolidacion = value
        },
        setLoadingConsolidacionTableBtnsPkg(state, value){
            console.log(value)
            state.loadingConsolidacionTableBtnsPkg = value
        },
        setDataready(state, value){
            state.dataready = value
        },
        
//==============================================================================//
//=============================== DEPOSITOS MUTATIONS ====================================//
//==============================================================================//
        setDepositoTableLoading(state, value){
            state.depositoTableLoading = value
        },
        setDepositosList(state, value){
            state.depositosList = value
        },
        setFullDeposito(state, value){
            state.deposito = value
        },
        setDepositoCantidad(state, value){
            state.deposito.cantidad = value
        },
        setFechaDeposito(state, value){
            state.deposito.fecha_deposito = value
        },
        setDepositosCreateFormVisible(state, value){
            state.depositosCreateFormVisible = value
        },
        setDepositosEditFormVisible(state, value){
            state.depositosEditFormVisible = value
        },
        setDepositoTotal(state, value){
            state.depositoTotal = value
        },
        resetDeposito(state){
            state.deposito = {
                id: null,
                cliente_id: null,
                cantidad: null,
                fecha_deposito: null,
            }
        },
        
    },

};