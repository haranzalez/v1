import HTTP from '../http'
import router from '../router'
import { Notification } from 'element-ui'

export default {
    root: true,
    namespaced: true,
    state: {
        nombre: null,
        apellido: null,
        email: null,
        username: null,
        password: null,
        passwordConfirm: null,
        token: null,
        ip: null,
    },
    actions: {
        resetPassword({ commit, state }){
           
            if(state.password !== state.passwordConfirm){
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Las contraseñas no coinsiden.',
                    position: 'bottom-right',
                });
              
                return;
            }
            return HTTP().local.post('/api/password/reset', {
                password: state.password,
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
                username: state.username,
                password: state.password,
            })
            .then(({ data }) => {
                commit('setToken', data.token)
                router.push('/dashboard')
                
            })
            .catch(() => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Credenciales incorrectas.',
                    position: 'bottom-right',
                });
                
            })
        },
        register({ state }){
            return HTTP().local.post('/api/users/create', {
                nombre: state.nombre,
                apellido: state.apellido,
                email: state.email,
                username: state.username,
                password: state.password,
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
               email: state.email,
               ip: state.ip,
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
        setNombre(state, nombre){
            state.nombre = nombre;
        },
        setApellido(state, apellido){
            state.apellido = apellido;
        },
        setEmail(state, email){
            state.email = email;
        },
        setUsername(state, username){
            state.username = username;
        },
        setPassword(state, password){
            state.password = password;
        },
        setToken(state, token){
            state.token = token;
        },
        setIp(state, ip){
            state.ip = ip;
        },
        setPasswordConfirm(state, password){
            state.passwordConfirm = password;
        },
    },
};