import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Loading } from 'element-ui'
import { mapGetters } from 'vuex';

export default {
    namespaced: true,
    state: {
        producto:{
            id: null,
            nombre: null,
            descripcion: null,
            precio: null,
        },
        loadingProductosTable: false,
        productosList: null,
        headings: [],   
    },

    actions: {
        fetchProductosList({state, commit, dispatch}){
            commit('setLoadingProductosTable', true)
            HTTP().local.get('api/productos')
            .then(d => {
                console.log(d.data)
                commit('setProductosList', d.data)
                dispatch('renderTableHeadings')
                commit('setLoadingProductosTable', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchProducto({commit, dispatch}, id){
            HTTP().local.get('api/productos/'+id)
            .then(d => {
                console.log(d.data)
                commit('setFullProducto', d.data[0])
            })
            .catch(err => {
                console.log(err)
            })
        },
        createProducto({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.post('api/productos/crear', {
                id: state.producto.id,
                nombre: state.producto.nombre,
                descripcion: state.producto.descripcion,
                precio: state.producto.precio,
            })
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Producto creado.'
                    })
                    dispatch('fetchProductosList')
                }
                load.close()
               
            })
            .catch(err => {
                console.log(err)
            })
        },
        editProducto({state, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.put('api/productos/'+state.producto.id+'/update', {
                id: state.producto.id,
                nombre: state.producto.nombre,
                descripcion: state.producto.descripcion,
                precio: state.producto.precio,
            })
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Producto actualizado.'
                    })
                    dispatch('fetchProductosList')
                }
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
        delProducto({state, dispatch, rootState}){
            var load = Loading.service(rootState.sharedValues.loading_options)
            HTTP().local.delete('api/productos/'+state.producto.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'producto eliminado exitosamente'
                    })
                    dispatch('fetchProductosList')
                }
                load.close()
            })
            .catch(err => {
                console.log(err)
            })
        },
      
        renderTableHeadings({state, commit}){
            let pkg = []
           
            for(let prop2 in state.productosList[0]){
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
        setLoadingProductosTable(state, value){
            state.loadingProductosTable = value
        },
        setFullProducto(state, value){
            state.producto = value
        },
        setProductosList(state, list){
            state.productosList = list
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setNombreProducto(state, value){
            state.producto.nombre = value
        },
        setDescripcionProducto(state, value){
            state.producto.descripcion = value
        },
        setPrecioProducto(state, value){
            state.producto.precio = value
        },
        productoReset(state){
            state.producto = {
                id: null,
                nombre: null,
                descripcion: null,
                precio: null,
            }
        }
    },
};