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
        dataReady: false,
        selectedPermisos: null,
        selectedModulos: [],
        moduleListDialogeVisible: false,
        roleModuleDialogeVisible: false,
        modulesAvailable: false,
        loading: false,
        permisosOps: {},
        activeTabs:[],
        availablePermisos: null,
    },
    actions: {
        fetchRoles({commit}){
            commit('setLoading', true)
            HTTP().local.get('api/roles')
            .then(r => {
                commit('setRolesList', r.data)
                commit('setDataReady', true)
                commit('setLoading', false)
            }).catch(err => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error en la operacion. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
            })
        },
  
        createRole({state}){
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
                }
            }).catch(err => {
                console.log(err)
            })
        },
        editRole({state, dispatch}){
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
        setPermisos({state, dispatch}, subId){
            console.log(subId,state.selectedPermisos)
            HTTP().local.post('api/roles/'+
            state.roleToEdit.id+'/subModulo/'+
            subId+'/setPermisos', state.selectedPermisos)
            .then(d => {
                if(d.status == 200){
                    Message({
                        showClose: true,
                        message: 'Permiso para '+state.selectedPermisos.op+' actualizado.',
                        type: 'success'
                    })
                    dispatch('fetchPermisos', 'ns')
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
                dispatch('fetchPermisos')
            }).catch(err => {
                console.log(err)
            })
        },
        fetchPermisos({state, commit, dispatch}, type){
            console.log('Fetching permisos..')
            HTTP().local.get('api/roles/'+state.roleToEdit.id+'/permisos')
            .then(d => {
               commit('setModules', d.data)
               console.log(state.modules)
               dispatch('renderPermisos', type)
            }).catch(err => {
                console.log(err)
            })
        },
        renderPermisos({state, commit, dispatch}, type){
            console.log('Rendering permisos..')
            var pkg = {}
            var availablePermisos = {}
            pkg[state.roleToEdit.nombre] = {}
            availablePermisos[state.roleToEdit.nombre] = {}
            for(let prop in state.modules){
                pkg[state.roleToEdit.nombre][state.modules[prop].nombre] = {}
                for(let prop2 in state.modules[prop].subModulo){
                    pkg[state.roleToEdit.nombre][state.modules[prop].nombre][state.modules[prop].subModulo[prop2].nombre] = state.modules[prop].subModulo[prop2].permisos
                }
                availablePermisos[state.roleToEdit.nombre][state.modules[prop].nombre] = {}
                for(let prop2 in state.modules[prop].subModulo){
                    availablePermisos[state.roleToEdit.nombre][state.modules[prop].nombre][state.modules[prop].subModulo[prop2].nombre] = ['editar', 'crear', 'eliminar']
                }
                
            }
            commit('setAvailablePermisos', availablePermisos)
            console.log(state.availablePermisos)
            commit('setPermisosOps',pkg)
            if(!type){
                dispatch('fetchAllModules')
            }

        },
        fetchAllModules({commit, dispatch}){
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
                dispatch('rederSelectedModulos')
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
            dispatch('renderActiveTabs')
        },
        renderActiveTabs({state, commit}){
            var pkg = []
            for(let prop in state.modules){
                var keys = Object.keys(state.permisosOps[state.roleToEdit.nombre][state.modules[prop]['nombre']])
                pkg[state.modules[prop]['nombre']] = keys[0]
            }
            commit('setActiveTabs', pkg)
        },

        addModule({state},id){
            HTTP().local.patch('api/roles/update/'+id,state.selectedPermisos)
            .then(res => {
                console.log(res)
            })
        },
        delRole({state}){
				HTTP().local.delete('api/roles/destroy/'+roleToEdit.id)
                .then(res => {
                    Message({
                        showClose: true,
                        message: 'Role eliminado.',
                        type: 'success'
                    })
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
            state.roleToEdit = role
        },
        setModules(state, modules){
            state.modules = null
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
            state.permisosOps = value
        },
        setActiveTabs(state, value){
            state.activeTabs = value
        },
        setAvailablePermisos(state, value){
            state.availablePermisos = value
        },
        setRenderReady(state, value){
            state.renderReady = value
        }
       
       
        
    },
}