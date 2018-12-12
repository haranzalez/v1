import HTTP from '../http';
import router from '../router'
import { Notification, Message } from 'element-ui'
import { Loading } from 'element-ui';
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
        dataReady: false,
        selectedPermisos: null,
        selectedModulos: [],
        moduleListDialogeVisible: false,
        roleModuleDialogeVisible: false,
        modulesAvailable: false,
        loading: false,
        activeTabs:[],
        activeSubMod: {},
        permisosOps: {},
        permisosRoleName: '',
        availablePermisos: null,

        checkedPermisos: [],
        permisosDialogVisible: false,
        loadingBtnsList: {},
        loadingAutorizarBtn: false,
        loadingActualizarBtn: false,
        loadingCrearBtn: false,
    },
    actions: {
        fetchRoles({commit, dispatch}){
            commit('setLoading', true)
            HTTP().local.get('api/roles')
            .then(r => {
                commit('setRolesList', r.data)
                commit('setDataReady', true)
                commit('setLoading', false)
                dispatch('fetchAllModules', 'ns')
            }).catch(err => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error en la operacion. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
            })
        },
  
        createRole({state, commit}){
            commit('setLoadingCrear', true)
            let pkg = {
            nombre: state.roleToCreate.nombre,
            description: state.roleToCreate.description,
            modulos: state.selectedModulos,
            }
            HTTP().local.post('api/roles/create', pkg)
            .then(d => {
                if(d.status == 200){
                    Message({
                        showClose: true,
                        message: 'Role '+state.roleToCreate.nombre+' creado exitosamente.',
                        type: 'success'
                    })
                    commit('setLoadingCrear', false)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        editRole({state, commit, dispatch}){
            commit('setLoadingActualizar', true)
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
                    dispatch('fetchRoles')
                    commit('setLoadingActualizar', false)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        setPermisos({state, commit}, subId){
            commit('setLoadingAutorizar', true)
            HTTP().local.post('api/roles/'+
            state.roleToEdit.id+'/subModulo/'+
            subId+'/setPermisos', {pkg:state.checkedPermisos})
            .then(d => {
                if(d.status == 200){
                    Message({
                        showClose: true,
                        message: 'Permiso actualizados.',
                        type: 'success'
                    })
                    commit('setLoadingAutorizar', false)
                }
            }).catch(err => {
                console.log(err)
            })
        },

        fetchRole({commit, dispatch},id){
            console.log('Fetching role..')
            HTTP().local.get('api/roles/'+id)
            .then(d => {

                commit('setRoleToEdit', d.data)
                dispatch('fetchModulos')
            }).catch(err => {
                console.log(err)
            })
        },
        fetchModulos({state, commit, dispatch}){
            console.log('Fetching permisos..')
            HTTP().local.get('api/roles/'+state.roleToEdit.id+'/permisos')
            .then(d => {
                var pkg = {}
                for(var prop in d.data){
                    for(var prop2 in d.data[prop].subModulo){
                        pkg[d.data[prop].subModulo[prop2].id] = false
                    }
                }
                commit('setLoadingBtnsList', pkg)
                console.log(d.data)
                commit('setModules', d.data)
                dispatch('fetchAllModules')
            }).catch(err => {
                console.log(err)
            })
        },
        fetchPermisosv2({state, commit, dispatch}, subid){
            commit('setLoadingBtn', {key:subid,value:true})
            console.log('Fetching permisos V2..')
            HTTP().local.get('api/roles/'+state.roleToEdit.id+'/subMod/'+subid)
            .then(d => {
                console.log(d.data)
                var pkg = []
                for(let prop in d.data){
                    if(d.data[prop]){
                        pkg.push(prop)
                    }
                }
                
                console.log(pkg)
                commit('setCheckedPermisos', pkg)
                commit('setLoadingBtn', {key:subid,value:false})
                commit('setPermisosDialogVisible', true)
            })
            .catch(err => {
                console.log(err)
            })
        },
       
        fetchAllModules({commit, dispatch}, type){
            console.log('Fetching modules..')
            HTTP().local.get('api/modulos')
            .then(d => {
                var data = []
                for (let prop in d.data) {
                    data.push({
                        key:d.data[prop]['id'],
                        label: d.data[prop]['nombre'],
                        disabled: false
                    });
                }
                commit('setAllModules', data)
                if(type == null){
                    dispatch('rederSelectedModulos')
                }
                
            }).catch(err => {
                console.log(err)
            })
        },
        rederSelectedModulos({state, commit, dispatch}){
            console.log('Rendering modules..')
            var data = []
            for(let prop in state.modules){
                data.push(state.modules[prop]['id'])
            }
         
     
            commit('setSelectedModules', data)
        },

        addModule({state},id){
            HTTP().local.patch('api/roles/update/'+id,state.selectedPermisos)
            .then(res => {
                console.log(res)
            })
        },
        delRole({state, dispatch}){
				HTTP().local.delete('api/roles/destroy/'+state.roleToEdit.id)
                .then(res => {
                    if(res.data.message == 'success'){
                        Message({
                            showClose: true,
                            message: 'Role eliminado.',
                            type: 'success'
                        })
                        dispatch('fetchRoles')
                    }
                    
                }).catch(err => {
                    console.log(err)
                })
			
            
        },
       
        
    },
    mutations: {
        setRolesList(state, roles){
            state.rolesList = roles
        },
        setRoleToEdit(state, role){
            console.log(role)
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
        setRoleToCreateDescription(state, description){
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
        },
        setSelectedPermisos(state, permisos){
            state.selectedPermisos = permisos
        },
        setRoleModuleDialogeVisible(state, value){
            state.roleModuleDialogeVisible = value
        },
        setModulesAvailable(state, value){
            state.modulesAvailable = value
        },
        setDataReady(state, bool){
            state.dataReady = bool
        },
        paramsReset(state){
            state.roleToCreate = {
                id: null,
                nombre: null,
                descripcion: null,
            }
        },
        setLoading(state, value){
            state.loading = value
        },
        setPermisosOps(state, value){
            console.log(value)
            state.permisosOps = value
        },
        setActiveTabs(state, value){
            state.activeTabs[value.modId + '-' + value.subId] = value.data
        },
        setAvailablePermisos(state, value){
            state.availablePermisos = value
        },
        setRenderReady(state, value){
            state.renderReady = value
        },
 
        setCheckedPermisos(state, value){
            state.checkedPermisos = value
        },
        setSelectedSubMod(state, value){
            state.selectedSubMod = value
        },
        setActiveSubMod(state, value){
            state.activeSubMod[value.modId] = value.subId
        },
        setPermisosDialogVisible(state, value){
            state.permisosDialogVisible = value
        },
        setLoadingBtnsList(state, value){
            state.loadingBtnsList = value
        },
        setLoadingBtn(state, pkg){
            state.loadingBtnsList[pkg.key] = pkg.value
        },
        setLoadingAutorizar(state, value){
            state.loadingAutorizarBtn = value
        },
        setLoadingActualizar(state, value){
            state.loadingActualizarBtn = value
        },
        setLoadingCrear(state, value){
            state.loadingCrearBtn = value
        },
        
    },
}