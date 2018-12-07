import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification } from 'element-ui'
import { mapGetters } from 'vuex';

export default {
    namespaced: true,
    state: {
        usuario:{
            nombre: null,
            apellido: null,
            cedula: null,
            email: null,
            tel_fijo: null,
            tel_mobil: null,
            direccion: null,
            ciudad: null,
            departamento: null,
            username: null,
            password: null,
            roles: null,
            estado: false,
        },
        estados: null,
        roles: null,
        selected: [],
        usersList: null,
        dataReady: false,
        loading: false,
        headings: [],
        
    },

    actions: {
        fetchUser({ commit, dispatch },id){
            HTTP().local.get('api/users/'+id)
            .then(d => {
                console.log(d.data[0])
                commit('setFullUser', d.data[0])
                dispatch('renderSelectedRoles')
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderSelectedRoles({state, commit}){
            var pkg = []
            for(var prop in state.usuario.roles){
                pkg.push(state.usuario.roles[prop].id)
            }
            commit('setSelectedRoles', pkg)

        },
        fetchUsersList({commit, dispatch}){
            commit('setLoading', true)
            HTTP().local.get('api/users')
            .then(d => {
                commit('setUsersList', d.data)
                
                commit('setDataReady', true)
                dispatch('renderTableHeadings')
                dispatch('renderEstadosObj')
                commit('setLoading', false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        renderTableHeadings({state, commit}){
            let pkg = []
           
            for(let prop2 in state.usersList[0]){
                if(prop2 == 'created_at' || prop2 == 'updated_at'){
                   continue;
                }else{
                    prop2 = prop2.split('_').join(' ')
                    prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                    pkg.push(prop2)
                }
                
            }
            
            commit('setTableHeadings', pkg)
        },
        editUser({state, commit}, roles){
            HTTP().local.patch('api/users/update/'+state.usuario.id,{
                nombre: state.usuario.nombre,
                apellido: state.usuario.apellido,
                cedula: state.usuario.cedula,
                email: state.usuario.email,
                tel_fijo: state.usuario.tel_fijo,
                tel_mobil: state.usuario.tel_mobil,
                direccion: state.usuario.direccion,
                ciudad: state.usuario.ciudad,
                departamento: state.usuario.departamento,
                roles: state.selected,
                estado: state.usuario.estado,
                }).then(d => {
                if(d.request.status == 200){
                    Notification.success({
                        title: 'Exito!',
                        message: 'Usuario actualizado.',
                        position: 'bottom-right',
                    });
                }
               
            }).catch(err => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error tratando de guardar la informacion. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
            })
        },
   
        createUser({ state, dispatch }){
            HTTP().local.post('api/users/create',{
                nombre: state.usuario.nombre,
                apellido: state.usuario.apellido,
                cedula: state.usuario.cedula,
                email: state.usuario.email,
                tel_fijo: state.usuario.tel_fijo,
                tel_mobil: state.usuario.tel_mobil,
                direccion: state.usuario.direccion,
                ciudad: state.usuario.ciudad,
                departamento: state.usuario.departamento,
                username: state.usuario.username,
                password: state.usuario.password,
                roles: state.selected,
                estado: state.usuario.estado,
            })
            .then(d => {
                if(d.request.status == 200){
                    Notification.success({
                        title: 'Exito!',
                        message: 'Usuario creado.',
                        position: 'bottom-right',
                    });
                    dispatch('fetchUsersList')
                }
            }).catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error tratando de crear el registro.',
                    position: 'bottom-right',
                });
            })
        },
        deleteUser({state, commit}){
            HTTP().local.delete('api/users/destroy/'+state.usuario.id)
            .then(d => {
                if(d.request.status == 200){
                    Notification.success({
                        title: 'Exito!',
                        message: 'Usuario eliminado.',
                        position: 'bottom-right',
                    });
                }
            }).catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se produjo un problema. Porfavor contactarse con el administrador',
                    position: 'bottom-right',
                });
            })
        },
        
        fetchRolesList({state, commit}, op){
            HTTP().local.get('api/roles')
            .then(d => {
                
                if(op == 'edit'){
                    let userRole = state.usuario.roles;
                    let allRoles = JSON.parse(d.request.response)
                    let ids = new Set(userRole.map(({ id }) => id));
                    
                    allRoles = allRoles.filter(({ id }) => ids.has(id));
                    
                    let final = []
                    for(let prop in allRoles){
                        final.push(allRoles[prop].id)
                    }
                
                    commit('setSelectedRoles', final)
                    commit('setRoles', JSON.parse(d.request.response))
                }else{
                    commit('setRoles', JSON.parse(d.request.response))
                }
                
            }).catch(err => {
                console.log(err)
            })
        },
        renderEstadosObj({ state, commit }){
            let pkg = {}
            for(let prop2 in state.usersList){
                
                pkg[state.usersList[prop2]['id']] = state.usersList[prop2]['estado']
            }
            commit('setEstadosObj', pkg)
            console.log(state.estados)
        },
        changeEstado({ state }){
            HTTP().local.patch('api/users/change-state/'+state.usuario.id,{
                    estado: state.estados[state.usuario.id],
                }).then(d => {
                if(d.data.message == 'success'){
                    Notification.success({
                        title: 'Exito!',
                        message: 'Cambio de estado exitoso.',
                        position: 'bottom-right',
                    });
                }
               
            }).catch(err => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error en la operacion. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
            })
        },
        
        
        

    },
    mutations: {
        setLoading(state, value){
            state.loading = value
        },
        setChangeEstdo(state, value){
            state.estados[value.id] = value.value
        },
        setEstadosObj(state, value){
            state.estados = value
        },
        setFullUser(state, usuario){
            state.usuario = usuario;
        },
        setNombre(state, nombre){
            state.usuario.nombre = nombre
        },
        setApellido(state, apellido){
            state.usuario.apellido = apellido
        },
        setCedula(state, cedula){
            state.usuario.cedula = cedula
        },
        setEmail(state, email){
            state.usuario.email = email
        },
        setTelFijo(state, telFijo){
            state.usuario.tel_fijo = telFijo
        },
        setTelMobil(state, telMobil){
            state.usuario.tel_mobil = telMobil
        },
        setDireccion(state, direccion){
            state.usuario.direccion = direccion
        },
        setCiudad(state, ciudad){
            state.usuario.ciudad = ciudad
        },
        setDepartamento(state, departamento){
            state.usuario.departamento = departamento
        },
        setUsername(state, username){
            state.usuario.username = username
        },
        setPassword(state, password){
            state.usuario.password = password
        },
        setUserRoles(state, roles){
            state.usuario.roles = roles
        },
        setRoles(state, roles){
            state.roles = roles
        },
        setSelectedRoles(state, roles){
            state.selected = roles
        },
        setUsersList(state, list){
            state.usersList = list
        },
        setDataReady(state, bool){
            state.dataReady = bool
        },
        setTableHeadings(state, headings){
            state.headings = headings;
        },
        setEstado(state, value){
            console.log(value)
            state.usuario.estado = value
        },
        paramsReset(state){
            state.usuario = {
                nombre: null,
                apellido: null,
                cedula: null,
                email: null,
                tel_fijo: null,
                tel_mobil: null,
                direccion: null,
                ciudad: null,
                departamento: null,
                username: null,
                password: null,
                roles: null,
            }
            state.selected = []
        }
        
    },

};