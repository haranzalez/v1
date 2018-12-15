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
            servicio: null,
            precio_servicio: null,
        },
        cuadreServicioEdit:{
            id: null,
            cliente_id: null,
            precio: null,
            ajuste: null,
            servicio: null,
            precio_servicio: null,
        },
        cuadreServiciosList: null,
        selectedServicio: null,
        headings: [],  
        summaryType: 'create',
    },
    actions: {
        createCuadreServicio({state}, cliente_id){
            HTTP().local.post('api/cuadre-servicios/crear', {
                cliente_id: cliente_id,
                servicio_id: state.selectedServicio,
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
        editCuadreServicio({state}, cliente_id){
            HTTP().local.put('api/cuadre-servicios/'+state.cuadre.id+'/update', {
                cliente_id: cliente_id,
                servicio_id: state.selectedServicio,
                precio: state.cuadreServicioEdit.precio,
                ajuste: state.cuadreServicioEdit.ajuste,
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
        delCuadreServicio({state}){
            HTTP().local.delete('api/cuadre-servicios/'+state.cuadreServicioEdit.id+'/delete')
            .then(d => {
                if(d.data.message == 'success'){
                    return true
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCuadreServicio({commit}, pkg){
            HTTP().local.get('api/cuadre-servicios/'+pkg.id)
            .then(d => {
                console.log(d.data)
               commit('setFullCuadreServicio', d.data[0])
               commit('setPrecioCuadreServicio', d.data[0].precio)
               commit('servicios/setPrecioServicio', d.data[0].servicio[0].precio, {root: true})
               commit('setSelectedServicio', d.data[0].servicio[0].nombre)
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
            state.cuadreServicioEdit = value
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
        },
        setPrecioServicio(state, value){
            state.cuadre.precio = value
        },
        setPrecioServicioEdit(state, value){
            state.cuadreServicioEdit.precio = value
        },
        setAjuste(state, value){
            state.cuadre.ajuste = value
        },
        setAjusteEdit(state, value){
            state.cuadreServicioEdit.ajuste = value
        },
        setSelectedServicio(state, value){
            state.selectedServicio = value
        },
        setSummaryType(state, value){
            state.summaryType = value
        },
        resetCuadreServicio(state){
            state.cuadre = {
                id: null,
                cliente_id: null,
                precio: null,
                ajuste: null,
                servicio: null,
                precio_servicio: null,
            }
            state.cuadreServicioEdit = {
                id: null,
                cliente_id: null,
                precio: null,
                ajuste: null,
                servicio: null,
                precio_servicio: null,
            }
            state.selectedServicio = ''
        }
    },

};