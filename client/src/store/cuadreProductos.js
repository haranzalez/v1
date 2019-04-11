import HTTP from '../http';
import router from '../router'
import { Notification, Message, Loading } from 'element-ui'


export default {
    namespaced: true,
    state: {
        cuadre:{
            id: null,
            cliente_id: null,
            precio_negociado: null,
            producto: null,
            precio_producto: null,
        },
        cuadreHistoryList: null,
        loadingCuadreProductoHistoryTable: false,
        selectedProductoForHistoryTable: '',
        cuadreProductosList: null,
        selectedProducto: null,
        headings: [],  
    },
    actions: {
        createCuadreProducto({state, rootState}, cliente_id){
            var load = Loading.service(rootState.sharedValues.loading_options)
            console.log(state.cuadre.precio)
            HTTP().local.post('api/cuadre-productos/crear', {
                cliente_id: cliente_id,
                producto_id: state.selectedProducto,
                precio_producto: state.cuadre.precio_producto,
                precio_negociado: state.cuadre.precio_negociado,
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
                load.close()
                console.log(err)
            })
        },
        editCuadreProducto({state, rootState}, cliente_id){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/cuadre-productos/'+state.cuadre.id+'/update', {
                cliente_id: cliente_id,
                producto_id: state.selectedProducto,
                precio_producto: state.cuadre.precio_producto,
                precio_negociado: state.cuadre.precio_negociado,
            })
            .then(d => {
                Message({
                    showClose: true,
                    type: "success",
                    message: 'Actualizacion Exitosa.'
                })
                load.close()
            })
            .catch(err => {
                load.close()
                console.log(err)
            })
        },
        delCuadreProducto({state, commit, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/cuadre-productos/'+state.cuadre.id+'/delete')
            .then(d => {
               if(d.data.message == 'success'){
                   commit('cuadreProductosReset')
                   return true
               }
               load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadreProductoHistory({ state, commit, rootState }){
            commit('setLoadingCuadreProductoHistoryTable', true)
            HTTP().local.post('api/cuadre-productos/history', {
                cuadre_producto_id: state.cuadre.id
            })
            .then(d => {
                console.log(d.data)
                commit('setCuadreProductoHistoryList', d.data)
                commit('setLoadingCuadreProductoHistoryTable', false)
            })
            .catch(err => {
                console.log(err)
                commit('setLoadingCuadreProductoHistoryTable', false)
            })
        },
        fetchCuadreProducto({commit}, pkg){
            HTTP().local.get('api/cuadre-productos/'+pkg.id)
            .then(d => {
               console.log(d.data[0])
               commit('setFullCuadreProducto', d.data[0])
               commit('setPrecioCuadreProducto', d.data[0].precio_negociado)
               commit('productos/setPrecioProducto', d.data[0].producto[0].precio, {root: true})
               commit('setSelectedProducto', d.data[0].producto[0].id)
               commit('setSelectedProductoForHistoryTable', d.data[0].producto[0].nombre)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadreProductosList({commit, dispatch}){
            HTTP().local.get('api/cuadre-productos')
            .then(d => {
               commit('setCuadreProductosList', d.data)
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
       
       
        
    },
    mutations: {
        setFullCuadreProducto(state, value){
            state.cuadre = value
        },
        setCuadreProductosList(state, list){
            state.cuadreProductosList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setClienteId(state, value){
            state.cuadre.cliente_id = value
        },
        setPrecioCuadreProducto(state, value){
            state.cuadre.precio_producto = value
            state.cuadre.precio_negociado = value
        },
        setPrecioNegociado(state, value){
            state.cuadre.precio_negociado = value
        },
        setAjuste(state, value){
            state.cuadre.ajuste = value
        },
        setSelectedProducto(state, value){
            state.selectedProducto = value
        },
        setCuadreProductoHistoryList(state, value){
            state.cuadreHistoryList = value
        },
        setLoadingCuadreProductoHistoryTable(state, value){
            state.loadingCuadreProductoHistoryTable = value
        },
        setSelectedProductoForHistoryTable(state, value){
            state.selectedProductoForHistoryTable = value
        },
        resetCuadreProducto(state){
            state.cuadre = {
                id: null,
                cliente_id: null,
                precio_negociado: null,
                producto: null,
                precio_producto: null,
                producto_id: null,
            }
            state.selectedProducto = '';
        }
    },

};