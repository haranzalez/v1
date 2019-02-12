import HTTP from '../http';
import router from '../router'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        cuadre:{
            cliente_id: null,
            precio_negociado: null,
            servicio: null,
            precio_servicio: null,
        },
        cuadreHistoryList: null,
        loadingCuadreServicioHistoryTable: false,
        selectedServicioForHistoryTable: '',
        cuadreServiciosList: null,
        selectedServicio: null,
        headings: [],  
        summaryType: 'create',
    },
    actions: {
        createCuadreServicio({state, rootState}, cliente_id){
            console.log(state.cuadre.precio_servicio)
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.post('api/cuadre-servicios/crear', {
                cliente_id: cliente_id,
                servicio_id: state.selectedServicio,
                precio_negociado: state.cuadre.precio_negociado,
                precio_servicio: state.cuadre.precio_servicio,
            })
            .then(d => {
                if(d.data.message == 'success'){
                    load.close()
                    return true
                }
                load.close()
                return d.data.message
            })
            .catch(err => {
                console.log(err)
            })
        },
        editCuadreServicio({state, rootState}, cliente_id){
            var load = Loading.service(rootState.sharedValues.loading_options)

            HTTP().local.put('api/cuadre-servicios/'+state.cuadre.id+'/update', {
                cliente_id: cliente_id,
                servicio_id: state.selectedServicio,
                precio_negociado: state.cuadre.precio_negociado,
                precio_servicio: state.cuadre.precio_servicio,
            })
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
                load.close()
            })
        },
        delCuadreServicio({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/cuadre-servicios/'+state.cuadre.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    load.close()
                    return true
                }
                load.close()
            })
            .catch(err => {
                load.close()
                console.log(err)
            })
        },
        fetchCuadreServicioHistory({ state, commit, rootState }){
            commit('setLoadingCuadreServicioHistoryTable', true)
            HTTP().local.post('api/cuadre-servicios/history', {
                cuadre_servicio_id: state.cuadre.id
            })
            .then(d => {
                console.log(d.data)
                commit('setCuadreServicioHistoryList', d.data)
                commit('setLoadingCuadreServicioHistoryTable', false)
            })
            .catch(err => {
                console.log(err)
                commit('setLoadingCuadreServicioHistoryTable', false)
            })
        },
        fetchCuadreServicio({commit}, pkg){
            HTTP().local.get('api/cuadre-servicios/'+pkg.id)
            .then(d => {
               console.log(d.data)
               d.data[0]['precio_servicio'] = d.data[0].servicio[0].precio
               commit('setFullCuadreServicio', d.data[0])
               commit('servicios/setPrecioServicio', d.data[0].servicio[0].precio, {root: true})
               commit('setSelectedServicio', d.data[0].servicio[0].id)
            })
            .catch(err => {
                console.log(err)
            })
        },
       
        fetchCuadreServiciosList({commit, dispatch}){
            HTTP().local.get('api/cuadre-servicios')
            .then(d => {
               commit('setCuadreServiciosList', d.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
            for(let prop2 in state.cuadreServiciosList[0]){
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
        setFullCuadreServicio(state, value){
            state.cuadre = value
        },
        setCuadreServiciosList(state, list){
            state.cuadreServiciosList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setClienteId(state, value){
            state.cuadre.cliente_id = value
        },
        setPrecioCuadreServicio(state, value){
            state.cuadre.precio_servicio = value
            state.cuadre.precio_negociado = value
        },
        setPrecioServicioNegociado(state, value){
            state.cuadre.precio_negociado = value
        },
        setPrecioServicio(state, value){
            state.cuadre.precio_servicio = value
        },
        setSelectedServicio(state, value){
            state.selectedServicio = value
        },
        setSummaryType(state, value){
            state.summaryType = value
        },
        setCuadreServicioHistoryList(state, value){
            state.cuadreHistoryList = value
        },
        setLoadingCuadreServicioHistoryTable(state, value){
            state.loadingCuadreServicioHistoryTable = value
        },
        setSelectedServicioForHistoryTable(state, value){
            state.selectedServicioForHistoryTable = value
        },
        resetCuadreServicio(state){
            state.cuadre = {
                cliente_id: null,
                precio_negociado: null,
                servicio: null,
                precio_servicio: null,
            }
            state.selectedServicio = ''
        }
    },

};