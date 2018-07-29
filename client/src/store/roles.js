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
        modulesList: null,
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
        fetchRole({commit},id){
            HTTP().local.get('api/roles/'+id)
            .then(d => {
                commit('setRole', d.data[0])
            })
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
    },
    mutations: {
        setRolesList(state, roles){
            state.rolesList = roles
        },
        setRole(state, role){
            state.role = role
        },
        setRoleNombre(state, nombre){
            state.role.nombre = nombre
        },
        setRoleDescription(state, description){
            state.role.description = description
        },
       
    },
}