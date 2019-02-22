import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import authentication from './authentication'
import layout from './layout'
import users from './users'
import logs from './userLogs'
import roles from './roles'

import conductores from './conductores'
import licenciasConductores from './licenciasConductores';
import documentosConductor from './documentosConductor';
import datosBancariosConductor from './datosBancariosConductor';
import vehiculos from './vehiculos'
import trailers from './trailers'
import rutas from './rutas'

import clientes from './clientes'
import cuadreViajes from './cuadreViajes'
import cuadreProductos from './cuadreProductos'
import cuadreServicios from './cuadreServicios'
import productos from './productos'
import servicios from './servicios'
import consolidaciones from './consolidaciones'
import backups from './backups'
import logger from './logger'
import transportadoras from './transportadoras'
import sharedValues from './sharedValues'
import reportes from './reportes'
import aseguradoras from './aseguradoras';
import documentosVehiculos from './documentosVehiculos';
import tecnomecanicaVehiculos from './tecnomecanicaVehiculos';
import documentosTrailers from './documentosTrailers';



Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	strict: false,
	state: {
	},
	
	modules: {
		authentication,
		layout,
		users,
		roles,
		logs,
		conductores,
		licenciasConductores,
		vehiculos,
		trailers,
		rutas,
		clientes,
		cuadreViajes,
		cuadreProductos,
		cuadreServicios,
		productos,
		servicios,
		consolidaciones,
		backups,
		logger,
		transportadoras,
		sharedValues,
		reportes,
		aseguradoras,
		documentosVehiculos,
		tecnomecanicaVehiculos,
		documentosTrailers,
		documentosConductor,
		datosBancariosConductor,
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
