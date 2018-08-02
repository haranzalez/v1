import HTTP from '../http';
import router from '../router'
import { Notification } from 'element-ui'

export default {
    namespaced: true,
    state: {
        role: {
            nombre: null,
            description: null,
        },
        modules: null,
        rolesList: null,
        rolesListEdit: null,

    },
    actions: {
        fetchRoles({commit}){
            HTTP().local.get('api/roles')
            .then(r => {
                console.log(r)
                commit('setRolesList', r.data)
            }).catch(err => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error en la operacion. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
            })
        },
        pushToEditRole({state,commit, dispatch}, id){
            dispatch('fetchRole', id)
            router.push('/editando-role')
        },
        edit({state}){
            console.log(state.role)
            HTTP().local.patch('api/roles/update/'+state.role.id, state.role)
            .then(d => {
                console.log(d)
            }).catch(err => {
                console.error(err)
            })
        },
        fetchRole({state, commit},id){
            HTTP().local.get('api/roles/'+id)
            .then(d => {
                commit('setRole', d.data[0])
                commit('setModules', d.data[0].modulos)
            })
        },
        fetchAllModules({commit}){
            HTTP().local.get('api/modulos')
            .then(d => {
                console.log(d)
                commit('setModules', d.data)
            }).catch(err => {
                console.log(err)
            })
        }
        
    },
    mutations: {
        setRolesList(state, roles){
            state.rolesList = roles
        },
        setRole(state, role){
            state.role = role
        },
        setModules(state, modules){
            state.modules = modules
        },
        setRoleNombre(state, nombre){
            state.role.nombre = nombre
        },
        setRoleDescription(state, description){
            state.role.description = description
        },
       
    },
}