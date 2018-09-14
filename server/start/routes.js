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
   //======================================================================================================================================
  //Vehiculos
  //======================================================================================================================================
  //GET
  Route.get('vehiculos', 'VehiculoController.get_all_vehicles').middleware('auth')
  Route.get('vehiculos/:id', 'VehiculoController.get_vehicle').middleware('auth')
  Route.get('vehiculos/:vehiculo_id/assign/trailer/:trailer_id', 'VehiculoController.assign_trailer').middleware('auth')
  Route.get('vehiculos/:vehiculo_id/assign/conductor/:conductor_id', 'VehiculoController.assign_conductor').middleware('auth')
  //POST
  Route.post('vehiculos/crear', 'VehiculoController.create_vehicle').middleware('auth')
  //PUT
  Route.put('vehiculos/:id/update', 'VehiculoController.update_vehicle').middleware('auth')
  //DELETE
  Route.delete('vehiculos/:id/delete', 'VehiculoController.delete_vehiculo').middleware('auth')
  //======================================================================================================================================
  //Trailers
  //======================================================================================================================================
  //GET
  Route.get('trailers', 'TrailerController.get_all_trailers').middleware('auth')
  Route.get('trailers/:id', 'TrailerController.get_trailer').middleware('auth')
  Route.get('trailers/:trailer_id/assign/:vehicle_id', 'TrailerController.assign_vehicle').middleware('auth')
  //POST
  Route.post('trailers/crear', 'TrailerController.create_trailer').middleware('auth')
  //PUT
  Route.put('trailers/:id/update', 'TrailerController.update_trailer').middleware('auth')
  //DELETE
  Route.delete('trailers/:id/delete', 'TrailerController.delete_trailer').middleware('auth')
  //======================================================================================================================================
  //Conductores
  //======================================================================================================================================
  //GET
  Route.get('conductores', 'ConductorController.get_all_conductores').middleware('auth')
  Route.get('conductores/:id', 'ConductorController.get_conductor').middleware('auth')
  Route.get('conductores/:conductor_id/assign/:vehicle_id', 'ConductorController.assign_vehicle').middleware('auth')
  //POST
  Route.post('conductores/crear', 'ConductorController.create_conductor').middleware('auth')
  Route.post('conductores/:id/licencia/crear', 'ConductorController.create_licence').middleware('auth')
  Route.post('conductores/:id/datos-bancarios/crear', 'ConductorController.create_bank_account').middleware('auth')
  //PUT
  Route.put('conductores/:id/update', 'ConductorController.update_conductor').middleware('auth')
  Route.put('conductores/:id/licencia/update', 'ConductorController.update_conductor_licence').middleware('auth')
  Route.put('conductores/:id/datos-bancarios/update', 'ConductorController.update_conductor_bank_account').middleware('auth')
  //DELETE
  Route.delete('conductores/:id/delete', 'ConductorController.delete_conductor').middleware('auth')
  Route.delete('conductores/datos-bancarios/:id/delete', 'ConductorController.delete_conductor_bank_account').middleware('auth')
  Route.delete('conductores/licencia/:id/delete', 'ConductorController.delete_conductor_licence').middleware('auth')
  //======================================================================================================================================
  //Clientes
  //======================================================================================================================================
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
  Route.put('cuadre-final/:id/editar', 'CuadroFinalController.alterarCuadre').middleware('auth')
}).prefix('api')


