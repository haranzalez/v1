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
    },
    getters: {
		successMessage: state => {
			if(state.success){
                state.success = false
				Notification.success({
                    title: 'Exito!',
                    message: 'Registro exitoso. Porfavor proceda a ingresar.',
                    position: 'bottom-right',
                });
                
			}
		},
		warningMessage: state => {
			if(state.warning){
                state.warning = false
				Notification.warning({
                    title: 'Atencion!',
                    message: 'Informacion incorrecta o duplicada',
                    position: 'bottom-right',
                });
			}
		},
	},
    actions: {
        register({ commit, state }){
            return HTTP().post('/api/users/create', {
                nombre: state.nombre,
                apellido: state.apellido,
                email: state.email,
                username: state.username,
                password: state.password,
            })
            .then(({ data }) => {
                commit('setSuccessMessage', true)
            })
            .catch(() => {
                commit('setWarningMessage', true)
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
    },
};