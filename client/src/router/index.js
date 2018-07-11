
import Vue from 'vue'
import Router from 'vue-router'

//apps
import Dashboard from '../views/apps/Dashboard.vue'
import layouts from '../layout'

//pages
import Login from '../views/pages/authentication/Login.vue'
import Register from '../views/pages/authentication/Register.vue'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import ResetPassword from '../views/pages/authentication/ResetPassword.vue'
import Profile from '../views/pages/Profile.vue'
import NotFound from '../views/pages/NotFound.vue'
import Invoice from '../views/pages/Invoice.vue'

import store from '../store/index'

Vue.use(Router)


const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			alias: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/invoice',
			name: 'invoice',
			component: Invoice,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/reset-password/:token',
			name: 'reset-password',
			component: ResetPassword,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{ 
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/login'})
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		}
	]
})


const l = {
	contenOnly(){
		store.commit('layout/setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('layout/setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('layout/setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('layout/setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('layout/setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('layout/setLayout', layout)
	}
}

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters['authentication/isLogged']
	},
	logout() {
		return store.dispatch('authentication/logout')
	},
}

router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth)
		authrequired = true

	//console.log('authrequired', authrequired, to.name)

	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'login') {
				window.location.href = '/'
				return false
			} else { 
				next()
			}
		} else {
			if(to.name !== 'login'){
				window.location.href = '/login'
				return false
			}
			next()
		}
	} else {
		if(auth.loggedIn() && to.name === 'login'){
			window.location.href = '/'
			return false
		} else {
			next()
		}
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
})

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('layout/setSplashScreen', false)
	}, 500)
})

export default router