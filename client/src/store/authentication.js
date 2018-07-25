import HTTP from '../http'
import router from '../router'
import { Notification } from 'element-ui'
import UserServices from '../services/UserServices'

export default {
    namespaced: true,
    state: {
        usuario: {
            nombre: null,
            apellido: null,
            nombreCompleto: null,
            cedula: null,
            email: null,
            tel_fijo: null,
            tel_mobil: null,
            direccion: null,
            ciudad: null,
            departamento: null,
            ip: null,
        },
        credenciales: {
            username: null,
            password: null,
            passwordConfirm: null,
            token: null,
        },
        logged: false,
        isAdmin: false,
        menu: null,
    },
    getters: {
        isLogged(state, getters) {
			return state.logged
		},
    },
    actions: {
        setup(){

        },
        resetPassword({ commit, state }){
           
            if(state.credenciales.password !== state.credenciales.passwordConfirm){
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Las contraseñas no coinsiden.',
                    position: 'bottom-right',
                });
              
                return;
            }
            return HTTP().local.post('/api/password/reset', {
                password: state.credenciales.password,
                token: router.currentRoute.params.token,
            }).then(({ data }) => {
                if(data.type == 'success'){
                    router.push('/login')
                }else{
                    Notification.warning({
                        title: 'Atencion!',
                        message: data.message,
                        position: 'bottom-right',
                    });
                }
            }).catch(err => {
                console.log(err)
            })
        },
        login({ commit, state }){
            return HTTP().local.post('/api/login', {
                username: state.credenciales.username,
                password: state.credenciales.password,
            })
            .then(({ data }) => {
                console.log(data)
                if(data.user[0].estado !== 'inactivo'){
                    commit('setUsuario', data.user[0])
                    commit('setNombreCompleto', data.user[0].nombre + ' ' + data.user[0].apellido)
                    commit('setToken', data.token.token)
                    const menu = []
                    for(let prop in data.user[0].roles){
                        for(let pro in data.user[0].roles[prop].modulos){
                            menu.push(data.user[0].roles[prop].modulos[pro])
                        }
                    }
                    let final = UserServices.removeDuplicatesFromObj(menu, 'id')
                    console.log(final)
                    commit('setMenu', final)
                    commit('setIsLogged')
                    router.push('/dashboard')
                    return;
                }
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Su cuenta se encuentra actualmente inactiva. Porfavor comuniquese con el administrador.',
                    position: 'bottom-right',
                });
                
            })
            .catch(err => {
                console.log(err)
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Credenciales incorrectas.',
                    position: 'bottom-right',
                });
            })
        },
        logout({ commit, rootState }){
            commit('layout/setLayout', {
                navPos: null,
                toolbar: null,
            }, {root: true})
            commit('setLogout')
        },
        register({ state }){
            return HTTP().local.post('/api/users/create', {
                nombre: state.usuario.nombre,
                apellido: state.usuario.apellido,
                cedula: state.usuario.cedula,
                email: state.usuario.email,
                tel_fijo: state.usuario.tel_fijo,
                tel_mobil: state.usuario.tel_mobil,
                direccion: state.usuario.direccion,
                ciudad: state.usuario.ciudad,
                departamento: state.usuario.departamento,
                username: state.credenciales.username,
                password: state.credenciales.password,
            })
            .then(({ data }) => {
                console.log(data)
                Notification.success({
                    title: 'Exito!',
                    message: 'Registro exitoso. Porfavor proceda a ingresar',
                    position: 'bottom-right',
                });
            })
            .catch(() => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Informacion incorrecta o duplicada.',
                    position: 'bottom-right',
                });
                
            })
        },
        requestPasswordChange({ commit, state }){
           HTTP().out.get('https://ipapi.co/json')
           .then(res => {
                commit('setIp', res.data.ip)
           })
           .catch(err => {
                Notification.warning({
                    title: 'Atencion!',
                    message: err.message,
                    position: 'bottom-right',
                });
    
           })

           HTTP().local.post('/api/password',{
               email: state.usuario.email,
               ip: state.usuario.ip,
           }).then(res => {
               if(res.data.type == 'success'){
                Notification.success({
                    title: 'Exito!',
                    message: res.data.message,
                    position: 'bottom-right',
                });
                
               }else if(res.data.type == 'warning'){
                Notification.warning({
                    title: 'Atencion!',
                    message: res.data.message,
                    position: 'bottom-right',
                });
                
               }
              
           }).catch(err => {
            Notification.warning({
                title: 'Atencion!',
                message: err.message,
                position: 'bottom-right',
            });
             
           })
          
        },
    },
    mutations: {
        setUsuario(state, usuario){
            state.usuario = usuario;
        },
        setIsLogged(state){
            state.logged = true;
        },
        setLogout(state, payload) {
            state.logged = false
		},
        setNombre(state, nombre){
            state.usuario.nombre = nombre;
        },
        setApellido(state, apellido){
            state.usuario.apellido = apellido;
        },
        setCedula(state, cedula){
            state.usuario.cedula = cedula
        },
        setNombreCompleto(state, nombre){
            state.nombreCompleto = nombre;
        },
        setEmail(state, email){
            state.usuario.email = email;
        },
        setUsername(state, username){
            state.credenciales.username = username;
        },
        setPassword(state, password){
            state.credenciales.password = password;
        },
        setToken(state, token){
            state.credenciales.token = token;
        },
        setIp(state, ip){
            state.usuario.ip = ip;
        },
        setPasswordConfirm(state, password){
            state.credenciales.passwordConfirm = password;
        },
        setRoles(state, roles){
            state.roles = roles
        },
        setMenu(state, menu){
            state.menu = menu
        },
        setTelFijo(state, fijo){
            state.usuario.tel_fijo = fijo
        },
        setTelMobil(state, mobil){
            state.usuario.tel_mobil = mobil
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
        
    },
};