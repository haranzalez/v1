import HTTP from '../http'
import router from '../router'
import { Notification } from 'element-ui'

export default {
    namespaced: true,
    state: {
        usuario: {
            nombre: null,
            apellido: null,
            email: null,
            ip: null,
        },
        roles: [],
        credenciales: {
            username: null,
            password: null,
            passwordConfirm: null,
            token: null,
        },
        logged: false,
        isAdmin: false,
    },
    getters: {
        isLogged(state, getters) {
			return state.logged
		},
    },
    actions: {
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
                if(data.roles.lenght > 0){
                    console.log(data.roles)
                    commit('setRoles', data.roles)
                }
                commit('setToken', data.token.token)
                commit('setIsLogged')
                router.push('/dashboard')
                
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
        logout({ commit }){
            commit('setLogout')
        },
        register({ state }){
            return HTTP().local.post('/api/users/create', {
                nombre: state.usuario.nombre,
                apellido: state.usuario.apellido,
                email: state.usuario.email,
                username: state.credenciales.username,
                password: state.credenciales.password,
            })
            .then(({ data }) => {
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
        setIsLogged(state){
            state.logged = true;
        },
        setLogout(state, payload) {
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
		},
        setNombre(state, nombre){
            state.usuario.nombre = nombre;
        },
        setApellido(state, apellido){
            state.usuario.apellido = apellido;
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
    },
};