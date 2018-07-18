import HTTP from '../http';
import router from '../router'

export default {
    namespaced: true,
    state: {
        usuario: null,
    },
    actions: {
        pushToEdit({commit}, row){
            commit('setUser', row)
            router.push('/editando-usuario')
        }
    },
    motations: {
        setUser(state, usuario){
            state.usuario = usuario;
        }
    },
};