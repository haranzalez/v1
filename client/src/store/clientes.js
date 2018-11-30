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
           tipo_contrato: null,
           created_at: null,
        },
        clientesList: null,
        cruadreRutasList: null,
        cuadreProductosList: null,
        cuadreServiciosList: null,
        dataReady: false,
        loadingClientesTable: false,
        loadingCuadreRutaTable: false,
        loadingCuadreProductoTable: false,
        loadingCuadreServicioTable: false,
        currentCuadresTab: 'Rutas',
        headings: [],   
    },

    actions: {
        fetchCuadresRutas({state, commit}){
            commit('setLoadingCuadreRutaTable', true)
            HTTP().local.get('api/clientes/'+state.cliente.id+'/cuadre-viajes')
            .then(d => {
                commit('setCuadreRutasList', d.data)
                commit('setLoadingCuadreRutaTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadresProductos({state, commit}){
            commit('setLoadingCuadreProductoTable', true)
            HTTP().local.get('api/clientes/'+state.cliente.id+'/cuadre-productos')
            .then(d => {
                console.log(d.data)
                commit('setCuadreProductosList', d.data)
                commit('setLoadingCuadreProductoTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadresServicios({state, commit}){
            commit('setLoadingCuadreServicioTable', true)
            HTTP().local.get('api/clientes/'+state.cliente.id+'/cuadre-servicios')
            .then(d => {
                console.log(d.data)
                commit('setCuadreServiciosList', d.data)
                commit('setLoadingCuadreServicioTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        createCliente({state, commit}){
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
                tipo_contrato: state.cliente.tipo_contrato,
            })
            .then(d => {
                if(d.data.message == "success"){
                    commit('setFullCliente', d.data.cliente)
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cliente creado.'
                    })
                    router.push('/Clientes')
                }
                return false
                
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        editCliente({state}){
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
                tipo_contrato: state.cliente.tipo_contrato,
            })
            .then(d => {
                console.log(d)
                Message({
                    type: 'success',
                    showClose: true,
                    message: 'Actualizacion exitosa.'
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        delCliente({state}){
            HTTP().local.delete('api/clientes/'+state.cliente.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cliente eliminado exitosamente'
                    })
                    router.push('/Clientes')
                }
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
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
           
            for(let prop2 in state.clientesList[0]){
                console.log(prop2)
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
        setFullCliente(state, value){
            state.cliente = value
        },
        setCuadreRutasList(state, list){
            state.cruadreRutasList = list
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
        setTipoContrato(state, value){
            state.cliente.tipo_contrato = value
        },
        setCelular(state, value){
            state.cliente.celular = value
        },
        setCurrentCuadresTab(state, value){
            console.log(value)
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
            }
        }
        
    },

};