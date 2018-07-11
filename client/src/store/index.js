import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import authentication from './authentication'
import layout from './layout'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
		splashScreen: true,
	},
	modules: {
		authentication,
		layout,
	},
	mutations: {
		setSplashScreen(state, payload) {
			state.splashScreen = payload
		},
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
