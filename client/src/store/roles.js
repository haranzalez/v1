import HTTP from '../http';
import router from '../router'
import { Notification } from 'element-ui'

export default {
    namespaced: true,
    state: {
        rolesList: null,

    },
    actions: {
        fetchRoles({commit}){
            HTTP().local.get('api/roles')
            .then(r => {
                console.log(r)
                commit('setRolesList', r.data)
            }).catch(err => {
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Se a producido un error en la operacion. Porfavor notifique al administrador',
                    position: 'bottom-right',
                });
            })
        }
    },
    mutations: {
        setRolesList(state, roles){
            state.rolesList = roles
        }
    }
}