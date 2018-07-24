import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'

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
            password: '123',
            roles: null,
        },
        roles: null,
        selected: [],
        
    },
    actions: {
        pushToEditUser({state,commit, dispatch}, row){
            commit('setUser', row)
            dispatch('fetchRolesList', 'edit')
            router.push('/editando-usuario')
        },
        editUser({state, commit}, roles){
            console.log(state.selectedRoles)
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
                username: state.usuario.username,
                roles: roles,
            }).then(d => {
                console.log(d)
            }).catch(err => {
                console.log(err)
            })
        },
        pushToCreateUser({state,commit}){
            state.usuario = {}
            router.push('/creando-usuario')
        },
        createUser({state}, roles){
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
                roles: roles,
            })
            .then(d => {
                console.log(d)
            }).catch(err => {
                console.log(err)
            })
        },
        fetchRolesList({state, commit}, op){
            HTTP().local.get('api/roles')
            .then(d => {
                
                if(op == 'edit'){
                    let userRole = state.usuario.roles;
                    let allRoles = JSON.parse(d.request.response)
                    let ids = new Set(userRole.map(({ id }) => id));
                    console.log(ids)
                    allRoles = allRoles.filter(({ id }) => ids.has(id));
                    console.log(allRoles)
                    let final = []
                    for(let prop in allRoles){
                        final.push(allRoles[prop].id)
                    }
                    console.log(final)
                    commit('setSelectedRoles', final)
                    commit('setRoles', JSON.parse(d.request.response))
                }else{
                    commit('setRoles', JSON.parse(d.request.response))
                }
                
            }).catch(err => {
                console.log(err)
            })
        },
        
        

    },
    mutations: {
        setUser(state, usuario){
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
        }
    },
};