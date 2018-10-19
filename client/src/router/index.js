
import Vue from 'vue'
import Router from 'vue-router'

//apps
import Dashboard from '../views/apps/Dashboard.vue'
import Usuarios from '../views/Usuarios/Usuarios.vue'
import UserEdit from '../views/Usuarios/EditarUsuario.vue'
import UserCreate from '../views/Usuarios/CrearUsuario.vue'
import RoleCreate from '../views/Usuarios/Roles/CrearRole.vue'
import RoleEdit from '../views/Usuarios/Roles/EditarRole.vue'
import Roles from '../views/Usuarios/Roles/RolesTable.vue'
import UsersLogs from '../views/Usuarios/Logs/LogsTable.vue'
import layouts from '../layout'

//conductores
import ConductoresTable from '../views/Conductores/Conductores.vue'
import ConductoresCreateForm from '../views/Conductores/CreateForm.vue'
import ConductoresEditForm from '../views/Conductores/EditForm.vue'
//trailers
import TrailersTable from '../views/Trailers/Trailers.vue'
import TrailersCreateForm from '../views/Trailers/CreateForm.vue'
import TrailersEditForm from '../views/Trailers/EditForm.vue'
//vehiculos
import VehiculosTable from '../views/Vehiculos/Vehiculos.vue'
import VehiculosCreateForm from '../views/Vehiculos/CreateForm.vue'
import VehiculosEditForm from '../views/Vehiculos/EditForm.vue'
//rutas
import RutasTable from '../views/Rutas/Rutas.vue'
import RutasEditForm from '../views/Rutas/EditForm.vue'

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
		//=========================================================================
		//Dashboard
		//=========================================================================
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
		//=========================================================================
		//Conductores
		//=========================================================================
		{
			path: '/Conductores',
			name: 'conductores',
			component: ConductoresTable,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Logistica']
			}
		},
		{
			path: '/conductores-crear',
			name: 'conductores - crear',
			component: ConductoresCreateForm,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Logistica']
			}
		},
		{
			path: '/conductores-editar',
			name: 'conductores - editar',
			component: ConductoresEditForm,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Logistica']
			}
		},
		//=========================================================================
		//Trailers
		//=========================================================================
		{
			path: '/Trailers',
			name: 'trailers',
			component: TrailersTable,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Logistica']
			}
		},
		{
			path: '/trailers-crear',
			name: 'trailers - crear',
			component: TrailersCreateForm,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Logistica']
			}
		},
		{
			path: '/trailers-editar',
			name: 'trailers - editar',
			component: TrailersEditForm,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Logistica']
			}
		},
		//=========================================================================
		//Vehiculos
		//=========================================================================
		{
			path: '/Vehiculos',
			name: 'vehiculos',
			component: VehiculosTable,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/vehiculos-crear',
			name: 'vehiculos - crear',
			component: VehiculosCreateForm,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/vehiculos-editar',
			name: 'vehiculos - editar',
			component: VehiculosEditForm,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		//=========================================================================
		//Trailers
		//=========================================================================
		{
			path: '/Rutas',
			name: 'rutas',
			component: RutasTable,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Logistica']
			}
		},
		{
			path: '/rutas-editar',
			name: 'rutas - editar',
			component: RutasEditForm,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Logistica']
			}
		},
		
		//=========================================================================
		//Usuarios
		//=========================================================================
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
			path: '/Usuarios',
			name: 'usuarios',
			component: Usuarios,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/creando-usuario',
			name: 'userCreate',
			component: UserCreate,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: false,
				tags: ['pages']
			}
		},
		{
			path: '/editando-usuario',
			name: 'userEdit',
			component: UserEdit,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: false,
				tags: ['pages']
			}
		},
		{
			path: '/Logs',
			name: 'userLogs',
			component: UsersLogs,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
			},
			tags: ['pages']
		},
		//=========================================================================
		//Roles
		//=========================================================================
		{
			path: '/Roles',
			name: 'roles',
			component: Roles,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/creando-role',
			name: 'roleCreate',
			component: RoleCreate,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: false,
				tags: ['pages']
			}
		},
		{
			path: '/editando-role',
			name: 'roleEdit',
			component: RoleEdit,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: false,
				tags: ['pages']
			}
		},
		//=========================================================================
		//Authentication
		//=========================================================================
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
		//=========================================================================
		//404
		//=========================================================================
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		},
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

	console.log('authrequired', authrequired, to.name)

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