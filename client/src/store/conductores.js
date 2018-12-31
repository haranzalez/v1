import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message } from 'element-ui'

export default {
    namespaced: true,
    state: {
        conductor:{
            codigo: null,
            tipo_de_identificacion: null,
            cedula: null,
            municipio_documento: null,
            nombres: null,
            primer_apellido: null,
            segundo_apellido: null,
            tipo_de_conductor: null,
            direccion: null,
            municipio: null,
            telefono_1: null,
            telefono_2: null,
            celular: null,
            transportadora: null,
        },
        datosBancarios:{
          id: null,
          titular: null,
          tipo_de_id: null,
          numero_cuenta_bancaria: null,
          tipo_cuenta_bancaria: null,
          banco: null,
          cuenta_propia: null,
          radica_rndc: null,
        },
        licencia: {
            id: null,
            numero_de_licencia: null,
            categoria: null,
            fecha_de_vencimiento: null,
        },
        cuentaPropiaSwitchCreate: null,
        radicaRndcSwitchCreate: null,
        cuentaPropiaSwitchEdit: null,
        radicaRndcSwitchEdit: null,
        conductoresList: null,
        dataReady: false,
        conductoresDataReady: false,
        headings: [],
        loadingConductoresTable: false,
        datosBancariosCreateFormVisible: false,
        datosBancariosEditFormVisible: false,
    },

    actions: {
        fetchConductor({state, commit, dispatch}, id){
            HTTP().local.get('api/conductores/'+id)
            .then(d => {
                commit('setFullConductor', d.data)
                dispatch('fetchDatosBancarios')
            })
            .catch(err => {
                console.log(err)
            })
        },
        createConductor({state, commit}){
            HTTP().local.post('api/conductores/crear', {
                codigo: state.conductor.codigo,
                tipo_de_identificacion: state.conductor.tipo_de_identificacion,
                cedula: state.conductor.cedula,
                municipio_documento: state.conductor.municipio_documento,
                nombres: state.conductor.nombres,
                primer_apellido: state.conductor.primer_apellido,
                segundo_apellido: state.conductor.segundo_apellido,
                tipo_de_conductor: state.conductor.tipo_de_conductor,
                direccion: state.conductor.direccion,
                municipio: state.conductor.municipio,
                telefono_1: state.conductor.telefono_1,
                telefono_2: state.conductor.telefono_2,
                celular: state.conductor.celular,
                transportadora: state.conductor.transportadora,
            })
            .then(d => {
                commit('setFullConductor', d.data)
                commit('setDatosBancariosCreateFormVisible', true)
                Message({
                    showClose: true,
                    message: 'Conductor creado.'
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        editConductor({state}){
            HTTP().local.put('api/conductores/'+state.conductor.id+'/update', {
                codigo: state.conductor.codigo,
                tipo_de_identificacion: state.conductor.tipo_de_identificacion,
                cedula: state.conductor.cedula,
                municipio_documento: state.conductor.municipio_documento,
                nombres: state.conductor.nombres,
                primer_apellido: state.conductor.primer_apellido,
                segundo_apellido: state.conductor.segundo_apellido,
                tipo_de_conductor: state.conductor.tipo_de_conductor,
                direccion: state.conductor.direccion,
                municipio: state.conductor.municipio,
                telefono_1: state.conductor.telefono_1,
                telefono_2: state.conductor.telefono_2,
                celular: state.conductor.celular,
                transportadora: state.conductor.transportadora,
            })
            .then(d => {
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
        fetchConductoresList({state, commit, dispatch}){
            commit('setLoadingConductoresTable', true)
            HTTP().local.get('api/conductores')
            .then(d => {
                commit('setConductorList', d.data)
                if(state.conductoresList != null){
                    commit('setDataReady', true)
                    dispatch('renderTableHeadings')
                }
                commit('setLoadingConductoresTable', false)
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        delConductor({state}){
            HTTP().local.delete('api/conductores/'+state.conductor.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Conductor eliminado exitosamente'
                    })
                    router.push('/Conductores')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
            for(let prop2 in state.conductoresList[0]){
                if(prop2 !== 'created_at' || prop2 !== 'updated_at'){
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
                
            }
            commit('setTableHeadings', pkg)
            
        },
//=======================================================================================//
//==================== DATOS BANCARIOS ==================================================//
//=======================================================================================//
        fetchDatosBancarios({ state, commit, dispatch }){
            HTTP().local.get('api/conductores/'+state.conductor.id+'/datos-bancarios')
            .then(d => {
               console.log(d.data)
               if(d.data.length > 0){
                commit('setDatosBancarios', d.data[0])
                commit('setCuenta_propia', {value:d.data[0].cuenta_propia, op:'edit'})
                commit('setRadica_rndc', {value:d.data[0].radica_rndc, op:'edit'})
               }else{
                commit('setDatosBancarios', [])
               }
               dispatch('fetchLicencias')
            })
            .catch(err => {
                console.log(err)
            })
        },
        create_datos_bancarios({ state, commit }){
            HTTP().local.post('api/conductores/'+state.conductor.id+'/datos-bancarios/crear', state.datosBancarios)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cuenta bancaria registrada'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        update_datos_bancarios({ state, commit }, conductor_id){
            HTTP().local.put('api/conductores/'+(conductor_id)?conductor_id:state.conductor.id+'/datos-bancarios/update',state.datosBancarios)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Cuenta bancaria actualizada'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
//=======================================================================================//
//========================== LICENCIAS ==================================================//
//=======================================================================================//
        fetchLicencias({ state, commit }){
            HTTP().local.get('api/conductores/'+state.conductor.id+'/licencias')
            .then(d => {
                console.log(d.data)
                if(d.data.length > 0){
                    commit('setLicencia', d.data[0])
                }else{
                    commit('setLicencia', [])
                }
                
                console.log(state.licencia)
            })
            .catch(err => {
                console.log(err)
            })
        },
        create_licencia({ state, commit }){
            HTTP().local.post('api/conductores/'+state.conductor.id+'/licencia/crear', state.licencia)
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Licencia registrada'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        update_licencia({ state, commit }, conductor_id){
            HTTP().local.put('api/conductores/licencia/'+state.licencia.id+'/update',state.licencia)
            .then(d => {
                console.log(d.data)
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Licencia actualizada'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        }

    },
    mutations: {
        setDatosBancariosCreateFormVisible(state, value){
            state.datosBancariosCreateFormVisible = value
        },
        setDatosBancariosEditFormVisible(state, value){
            state.datosBancariosEditFormVisible = value
        },
        setConductorList(state, list){
            state.conductoresList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setTableHeadingsToExport(state, headings){
            state.exportHeadings = headings;
        },
        setDataReady(state, ready){
            state.conductoresDataReady = ready
        },

        setCodigo(state, value){
            state.conductor.codigo = value
        },
        setTipoDeiIdentificacion(state, value){
                state.conductor.tipo_de_identificacion = value
        },
        setCedula(state, value){
            state.conductor.cedula = value
        },
        setMunicipioDocumento(state, value){
            state.conductor.municipio_documento = value
        },
        setNombres(state, value){
            state.conductor.nombres = value
        },
        setPrimerApellido(state, value){
            state.conductor.primer_apellido = value
        },
        setSegundoApellido(state, value){
            state.conductor.segundo_apellido = value
        },
        setTipoDeConductor(state, value){
            state.conductor.tipo_de_conductor = value
        },
        setDireccion(state, value){
            state.conductor.direccion = value
        },
        setMunicipio(state, value){
            state.conductor.municipio = value
        },
        setTelefono1(state, value){
            state.conductor.telefono_1 = value
        },
        setTelefono2(state, value){
            state.conductor.telefono_2 = value
        },
        setCelular(state, value){
            state.conductor.celular = value
        },
        setTransportadora(state, value){
            state.conductor.transportadora = value
        },
        setFullConductor(state, value){
            state.conductor = value
        },
        setLoadingConductoresTable(state, value){
            state.loadingConductoresTable = value
        },
        resetConductoresVars(state){
            state.conductor = {
                codigo: null,
                tipo_de_identificacion: null,
                cedula: null,
                municipio_documento: null,
                nombres: null,
                primer_apellido: null,
                segundo_apellido: null,
                tipo_de_conductor: null,
                direccion: null,
                municipio: null,
                telefono_1: null,
                telefono_2: null,
                celular: null,
                transportadora: null,
            }
        },

        //DATOS BANCARIOS MUTATIONS
        setDatosBancarios(state, value){
            state.datosBancarios = value
        },
        setTitular(state, value){
            state.datosBancarios.titular = value
        },
        setTipo_de_id(state, value){
            state.datosBancarios.tipo_de_id = value
        },
        setNumero_cuenta_bancaria(state, value){
            state.datosBancarios.numero_cuenta_bancaria = value
        },
        setTipo_cuenta_bancaria(state, value){
            state.datosBancarios.tipo_cuenta_bancaria = value
        },
        setBanco(state, value){
            state.datosBancarios.banco = value
        },
        setCuenta_propia(state, pkg){
            if(pkg.op == 'create'){
                state.cuentaPropiaSwitchCreate = pkg.value
            }else{
                state.cuentaPropiaSwitchEdit = pkg.value
            }
            
            state.datosBancarios.cuenta_propia = pkg.value
        },
        setRadica_rndc(state, pkg){
            if(pkg.op == 'create'){
                state.radicaRndcSwitchCreate = pkg.value
            }else{
                state.radicaRndcSwitchEdit = pkg.value
            }
            state.datosBancarios.radica_rndc = pkg.value
        },
       
        resetDatosBancarios(state){
            state.datosBancarios = {
                id: null,
                titular: null,
                tipo_de_id: null,
                numero_cuenta_bancaria: null,
                tipo_cuenta_bancaria: null,
                banco: null,
                cuenta_propia: null,
                radica_rndc: null,
            }
        },
        //LICENCIAS MUTATIONS
        setLicencia(state, value){
            state.licencia = value
        },
        setNumeroLicencia(state, value){
            state.licencia.numero_de_licencia = value
        },
        setCategoria(state, value){
            state.licencia.categoria = value
        },
        setFechaVencimiento(state, value){
            state.licencia.fecha_de_vencimiento = value
        },

        resetLicencia(state){
            state.licencia = {
                id: null,
                numero_de_licencia: null,
                categoria: null,
                fecha_de_vencimiento: null,
            }
        }
        
    },

};