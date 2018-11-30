import HTTP from '../http';
import router from '../router'
import { Notification, Message, Confirm } from 'element-ui'


export default {
    namespaced: true,
    state: {
        cuadre:{
            id: null,
            cliente_id: null,
            precio: null,
            ajuste: null,
            producto: null,
            precio_producto: null,
        },
        cuadreProductosList: null,
        selectedProducto: null,
        headings: [],  
    },
    actions: {
        createCuadreProducto({state}, cliente_id){
            HTTP().local.post('api/cuadre-productos/crear', {
                cliente_id: cliente_id,
                producto_id: state.selectedProducto,
                precio: state.cuadre.precio,
                ajuste: state.cuadre.ajuste,
            })
            .then(d => {
                if(d.data.message == 'success'){
                    return true
                }
                return d.data.message
            })
            .catch(err => {
                console.log(err)
            })
        },
        editCuadreProducto({state}){
            HTTP().local.put('api/cuadre-productos/'+state.cuadre.id+'/update', {
                cliente_id: cliente_id,
                producto_id: state.selectedProducto,
                precio: state.cuadre.precio,
                ajuste: state.cuadre.ajuste,
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
        delCuadreProducto({state, commit}){
            console.log(state.cuadre)
            console.log(state.cuadre.id)
            HTTP().local.delete('api/cuadre-productos/'+state.cuadre.id+'/delete')
            .then(d => {
               if(d.data.message == 'success'){
                   commit('cuadreProductosReset')
                   return true
               }
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadreProducto({commit}, pkg){
            HTTP().local.get('api/cuadre-productos/'+pkg.id)
            .then(d => {
                console.log(d.data)
               commit('setFullCuadreProducto', d.data[0])
               commit('setPrecioCuadreProducto', d.data.precio)
               commit('productos/setPrecioProducto', d.data.precio_producto, {root: true})
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
        },
        setPrecioProducto(state, value){
            state.cuadre.precio = value
        },
        setAjuste(state, value){
            state.cuadre.ajuste = value
        },
        setSelectedProducto(state, value){
            state.selectedProducto = value
        },
        cuadreProductosReset(state){
            state.cuadre = {
                id: null,
                cliente_id: null,
                precio: null,
                ajuste: null,
                producto: null,
                precio_producto: null,
            }
        }
    },

};