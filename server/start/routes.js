'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')


Route.group(() => {

  Route.post('login', 'UserController.login');
  Route.get('logout', 'UserController.logout');
  Route.post('password', 'UserController.sendPasswordChangeEmail');
  Route.get('password/reset/:token', 'UserController.confirmPasswordChange');
  Route.post('password/reset', 'UserController.resetPassword');

  Route.get('users', 'UserController.index').middleware('auth');
  Route.get('userLogs', 'UserController.userLogs').middleware('auth');
  Route.get('users/:id', 'UserController.fetchOne').middleware('auth');
  Route.post('users/create', 'UserController.create').middleware('auth');
  Route.delete('users/destroy/:id', 'UserController.destroy').middleware('auth');
  Route.patch('users/update/:id', 'UserController.update').middleware('auth');

  Route.get('roles', 'RoleController.index').middleware('auth');
  Route.get('roles/:id', 'RoleController.fetchOne').middleware('auth');
  Route.post('roles/create', 'RoleController.create').middleware('auth');
  Route.delete('roles/destroy/:id', 'RoleController.destroy').middleware('auth');
  Route.patch('roles/update/:id', 'RoleController.update').middleware('auth');
  
  Route.get('modulos', 'RoleController.fetchAllModules').middleware('auth');
  Route.get('roles/:id/modulos', 'RoleController.modules').middleware('auth');
  Route.get('roles/:id/permisos', 'RoleController.permisos').middleware('auth');
  Route.post('roles/:role_id/subModulo/:sub_modulo_id/setPermisos', 'RoleController.setPermisos').middleware('auth');
  Route.patch('roles/:id/modulos/updatePermisos', 'RoleController.updatePermisos').middleware('auth');

  //CUADRO DE VIAJES
  //Clientes
  Route.get('clientes', 'ClienteController.todos').middleware('auth')
  Route.post('clientes/crear', 'ClienteController.crearCliente').middleware('auth')
  //Producto
  Route.get('cuadre-producto', 'CuadroProductoController.todos').middleware('auth')
  Route.post('cuadre-producto/crear', 'CuadroProductoController.crearCuadre').middleware('auth')
  //Viaje
  Route.get('cuadre-viaje', 'CuadroViajeController.todos').middleware('auth')
  Route.post('cuadre-viaje/crear', 'CuadroViajeController.crearCuadre').middleware('auth')
  //Servicio
  Route.get('cuadre-servicio', 'CuadroServicioController.todos').middleware('auth')
  Route.post('cuadre-servicio/crear', 'CuadroServicioController.crearCuadre').middleware('auth')
  //Cuadre final
  Route.get('cuadre-final', 'CuadroFinalController.todos').middleware('auth')
  Route.post('cuadre-final/crear', 'CuadroFinalController.crearCuadre').middleware('auth')
}).prefix('api')


