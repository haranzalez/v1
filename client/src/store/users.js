import HTTP from '../http';
import router from '../router'

export default {
    namespaced: true,
    state: {
        usuario: null,
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
    actions: {
        pushToEditUser({state,commit}, row){
            commit('setUser', row)
            router.push('/editando-usuario')
        },
        editUser({state, commit}){
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
            }).then(d => {
                console.log(d)
            }).catch(err => {
                console.log(err)
            })
        },
        pushToCreateUser({state,commit}){
            router.push('/creando-usuario')
        },
        createUser({state}){
            HTTP().local.post('api/users/create',{
                nombre: state.nombre,
                apellido: state.apellido,
                cedula: state.cedula,
                email: state.email,
                tel_fijo: state.tel_fijo,
                tel_mobil: state.tel_mobil,
                direccion: state.direccion,
                ciudad: state.ciudad,
                departamento: state.departamento,
                username: state.username,
                password: state.password,
            })
            .then(d => {
                console.log(d)
                
            }).catch(err => {
                console.log(err)
            })
        },
        fetchRolesList({state, commit}){
            HTTP().local.get('api/roles')
            .then(d => {
                console.log(d)
                commit('setRoles', d.data)
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
            state.nombre = nombre
        },
        setApellido(state, apellido){
            state.apellido = apellido
        },
        setCedula(state, cedula){
            state.cedula = cedula
        },
        setEmail(state, email){
            state.email = email
        },
        setTelFijo(state, telFijo){
            state.tel_fijo = telFijo
        },
        setTelMobil(state, telMobil){
            state.tel_mobil = telMobil
        },
        setDireccion(state, direccion){
            state.direccion = direccion
        },
        setCiudad(state, ciudad){
            state.ciudad = ciudad
        },
        setDepartamento(state, departamento){
            state.departamento = departamento
        },
        setUsername(state, username){
            state.username = username
        },
        setPassword(state, password){
            state.password = password
        },
        setRoles(state, roles){
            state.roles = roles
        },
    },
};