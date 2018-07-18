import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import authentication from './authentication'
import layout from './layout'
import users from './users'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
	},
	modules: {
		authentication,
		layout,
		users,
	},
	mutations: {
	},
	actions: {
	},
	getters: {
	},
	plugins: [createPersistedState({
		paths: ['login']
	})],
	strict: debug
})
