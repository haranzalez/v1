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
        warning: null,
        success: null,
        token: null,
    },
    getters: {
		successMessage: state => {
			if(state.success){
                
				Notification.success({
                    title: 'Exito!',
                    message: state.success,
                    position: 'bottom-right',
                });
                state.success = null;
                
			}
		},
		warningMessage: state => {
			if(state.warning){
                
				Notification.warning({
                    title: 'Atencion!',
                    message: state.warning,
                    position: 'bottom-right',
                });
                state.warning = null;
			}
		},
	},
    actions: {
        login({ commit, state }){
            return HTTP().post('/api/login', {
                username: state.username,
                password: state.password,
            })
            .then(({ data }) => {
                commit('setToken', data.token)
                router.push('/dashboard')
                
            })
            .catch(() => {
                commit('setWarningMessage', 'Credenciales incorrectas.')
            })
        },
        register({ commit, state }){
            return HTTP().post('/api/users/create', {
                nombre: state.nombre,
                apellido: state.apellido,
                email: state.email,
                username: state.username,
                password: state.password,
            })
            .then(({ data }) => {
                commit('setSuccessMessage', 'Registro exitoso. Porfavor proceda a ingresar')
            })
            .catch(() => {
                commit('setWarningMessage', 'Informacion incorrecta o duplicada.')
            })
        },
    },
    mutations: {
        setSuccessMessage(state, success){
            state.success = success
        },
        setWarningMessage(state, warning){
            state.warning = warning
        },
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
        }
    },
};