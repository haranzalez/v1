import HTTP from '../http';
import router from '../router'
import { Notification, Message } from 'element-ui'

export default {
    namespaced: true,
    state: {
        roleToCreate: {
            nombre: null,
            description: null,
        },
        roleToEdit: {
            nombre: null,
            description: null,
        },
        modules: null,
        allModules: null,
        rolesList: null,
        selectedPermisos: null,
        selectedModulos: null,
        moduleListDialogeVisible: false,
        roleModuleDialogeVisible: false,
        modulesAvailable: false,
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
        pushToCreateRole({state, commit}){
            commit('setSelectedModules', null)
            router.push('/creando-role')
        },
        create({state}){
            let pkg = {
            nombre: state.role.nombre,
            description: state.role.description,
            modulos: state.selectedModulos,
            }
            HTTP().local.post('api/roles/create', pkg)
            .then(d => {
                if(d.status == 200){
                    Message({
                        showClose: true,
                        message: 'Role '+state.role.nombre+' creado exitosamente.',
                        type: 'success'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        edit({state}){
            let pkg = {
               nombre: state.roleToEdit.nombre,
               description: state.roleToEdit.description,
               modulos: state.selectedModulos,
            }
            console.log(pkg)
            HTTP().local.patch('api/roles/update/'+state.roleToEdit.id, pkg)
            .then(d => {
                if(d.status == 200){
                    Message({
                        showClose: true,
                        message: 'Role actualizado correctamente.',
                        type: 'success'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        setPermisos({state}, subId){
            HTTP().local.post('api/roles/'+
            state.role.id+'/subModulo/'+
            subId+'/setPermisos', state.selectedPermisos)
            .then(d => {
                if(d.status == 200){
                    Message({
                        showClose: true,
                        message: 'Permisos actualizados.',
                        type: 'success'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        fetchRole({state, commit},id){
            HTTP().local.get('api/roles/'+id)
            .then(d => {
                commit('setRoleToEdit', d.data[0])
                if(d.data[0].modulos.length > 0){
                    commit('setModules', d.data[0].modulos)
                    commit('setModulesAvailable', true)
                }else{
                    commit('setModulesAvailable', false)
                }
                
            }).catch(err => {
                console.log(err)
            })
        },
        fetchAllModules({commit}){
            HTTP().local.get('api/modulos')
            .then(d => {
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
        setRoleToEdit(state, role){
            state.roleToEdit = role
        },
        setModules(state, modules){
            state.modules = modules
        },
        setRoleToEditNombre(state, nombre){
            state.roleToEdit.nombre = nombre
        },
        setRoleToEditDescription(state, description){
            state.roleToEdit.description = description
        },
        setRoleToCreateNombre(state, nombre){
            state.roleToCreate.nombre = nombre
        },
        setRoleTocreateDescription(state, description){
            state.roleToCreate.description = description
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
        setRoleModuleDialogeVisible(state, value){
            state.roleModuleDialogeVisible = value
        },
        setModulesAvailable(state, value){
            state.modulesAvailable = value
        }
       
    },
}