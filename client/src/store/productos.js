import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Confirm } from 'element-ui'
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
        productosList: null,
        headings: [],   
    },

    actions: {
        createProducto({state}){
            HTTP().local.post('api/productos/crear', {
                id: state.producto.id,
                nombre: state.producto.nombre,
                descripcion: state.producto.descripcion,
                precio: state.producto.precio,
            })
            .then(d => {
                Message({
                    showClose: true,
                    message: 'Producto creado.'
                })
               
            })
            .catch(err => {
                console.log(err)
            })
        },
        editProducto({state}){
            HTTP().local.put('api/productos/'+state.producto.id+'/update', {
                id: state.producto.id,
                nombre: state.producto.nombre,
                descripcion: state.producto.descripcion,
                precio: state.producto.precio,
            })
            .then(d => {
                Message({
                    showClose: true,
                    message: 'Actualizacion exitosa.'
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        delProducto({state}){
            HTTP().local.delete('api/trailers/'+state.trailer.id+'/delete')
            .then(d => {
                if(d){
                    Message({
                        type: 'success',
                        showClose: true,
                        message: 'Trailer eliminado exitosamente'
                    })
                    router.push('/Trailers')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchProductosList({state, commit, dispatch}){
            HTTP().local.get('api/productos')
            .then(d => {
                commit('setProductosList', d.data)
                dispatch('renderTableHeadings')
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
           
            for(let prop2 in state.trailersList[0]){
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
    },
};