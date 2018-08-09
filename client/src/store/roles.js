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
        allModules: null,
        rolesList: null,
        selectedPermisos: null,
        selectedModulos: null,
        moduleListDialogeVisible: false,

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
            
            let pkg = {
               nombre: state.role.nombre,
               description: state.role.description,
               modulos: state.selectedModulos,
            }
            HTTP().local.patch('api/roles/update/'+state.role.id, pkg)
            .then(d => {
                console.log(d)
            }).catch(err => {
                console.error(err)
            })
        },
        setPermisos({state}, subId){
            console.log(state.selectedPermisos)
            HTTP().local.post('api/roles/'+
            state.role.id+'/subModulo/'+
            subId+'/setPermisos', state.selectedPermisos)
            .then(d => {
                console.log(d)
            }).catch(err => {
                console.log(err)
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
                commit('setAllModules', d.data)
            }).catch(err => {
                console.log(err)
            })
        },
        addModule({state},id){
            HTTP().local.patch('api/roles/update/'+id,state.selectedPermisos)
            .then(res => {
                console.log(res)
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
        setModules(state, modules){
            state.modules = modules
        },
        setRoleNombre(state, nombre){
            state.role.nombre = nombre
        },
        setRoleDescription(state, description){
            state.role.description = description
        },
        setAllModules(state, modules){
            state.allModules = modules
        },
        setModuleListDialogeVisible(state, value){
            state.moduleListDialogeVisible = value
        },
        setSelectedModules(state, modulos){
            state.selectedModulos = modulos
            state.moduleListDialogeVisible = false
        },
        setSelectedPermisos(state, permisos){
            state.selectedPermisos = permisos
        },
       
    },
}