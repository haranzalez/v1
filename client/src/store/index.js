import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import authentication from './authentication'
import layout from './authentication'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
		splashScreen: true,
		logged: false
	},
	modules: {
		authentication,
		layout,
	},
	mutations: {
		
		setLogout(state, payload) {
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
		},
		setSplashScreen(state, payload) {
			state.splashScreen = payload
		}
	},
	actions: {

	},
	getters: {
		
		splashScreen(state, getters) {
			return state.splashScreen
		},
		
	},
	plugins: [createPersistedState({paths: ['layout']})],
	strict: debug
})
