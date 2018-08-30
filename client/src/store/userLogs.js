import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification } from 'element-ui'
import { mapGetters } from 'vuex';

export default {
    namespaced: true,
    state: {
        logsList: null, 
    },

    actions: {
        fetchLogs({commit, dispatch}){
            HTTP().local.get('api/userLogs')
            .then(d => {
                
                let pkg = []
                for(let prop in d.data){
                    for(let prop2 in d.data[prop]['logs']){
                        d.data[prop]['logs'][prop2]['user'] = d.data[prop]['nombre']+' '+d.data[prop]['apellido']
                        pkg.push(d.data[prop]['logs'][prop2])
                    }
                }
                console.log(pkg)
                commit('setLogsList', pkg)
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    mutations: {
      setLogsList(state, logs){
          state.logsList = logs
      }
        
    },

};