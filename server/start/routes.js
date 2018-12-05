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

  Route.get('/', 'TestController.answer')

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
  Route.patch('users/change-state/:id', 'UserController.changeState').middleware('auth');


  Route.get('roles', 'RoleController.index').middleware('auth');
  Route.get('roles/:id', 'RoleController.fetchOne').middleware('auth');
  Route.post('roles/create', 'RoleController.create').middleware('auth');
  Route.delete('roles/destroy/:id', 'RoleController.destroy').middleware('auth');
  Route.patch('roles/update/:id', 'RoleController.update').middleware('auth');
  Route.get('roles/:id/permisos', 'RoleController.fetchPermisos').middleware('auth');
  
  Route.get('modulos', 'RoleController.fetchAllModules').middleware('auth');
  Route.get('roles/:id/modulos', 'RoleController.modules').middleware('auth');
  Route.post('roles/:role_id/subModulo/:sub_modulo_id/setPermisos', 'RoleController.setPermisos').middleware('auth');
  Route.patch('roles/:id/modulos/updatePermisos', 'RoleController.updatePermisos').middleware('auth');
  //======================================================================================================================================
  //servicios
  //======================================================================================================================================
  //GET
  Route.get('servicios', 'ServicioController.get_all').middleware('auth')
  Route.get('servicios/:id', 'ServicioController.get_one').middleware('auth')
  //POST
  Route.post('servicios/crear', 'ServicioController.create_servicio').middleware('auth')
  //PUT
  Route.put('servicios/:id/update', 'ServicioController.update_servicio').middleware('auth')
  //DELETE
  Route.delete('servicios/:id/delete', 'ServicioController.delete_servicio').middleware('auth')
  //======================================================================================================================================
  //Cuadre servicios
  //======================================================================================================================================
  //GET
  Route.get('cuadre-servicios', 'CuadroServicioController.get_all').middleware('auth')
  Route.get('cuadre-servicios/:id', 'CuadroServicioController.get_one').middleware('auth')
  Route.get('cuadre-servicios/client/:id', 'CuadroServicioController.get_client_cuadres').middleware('auth')
  //POST
  Route.post('cuadre-servicios/crear', 'CuadroServicioController.create_cuadre').middleware('auth')
  //PUT
  Route.put('cuadre-servicios/:id/update', 'CuadroServicioController.update_cuadre').middleware('auth')
  //DELETE
  Route.delete('cuadre-servicios/:id/delete', 'CuadroServicioController.delete_cuadre').middleware('auth')
  //======================================================================================================================================
  //Productos
  //======================================================================================================================================
  //GET
  Route.get('productos', 'ProductoController.get_all_productos').middleware('auth')
  Route.get('productos/:id', 'ProductoController.get_producto').middleware('auth')
  //POST
  Route.post('productos/crear', 'ProductoController.create_producto').middleware('auth')
  //PUT
  Route.put('productos/:id/update', 'ProductoController.update_producto').middleware('auth')
  //DELETE
  Route.delete('productos/:id/delete', 'ProductoController.delete_producto').middleware('auth')
  //======================================================================================================================================
  //Cuadre Productos
  //======================================================================================================================================
  //GET
  Route.get('cuadre-productos', 'CuadroProductoController.get_all_cuadres').middleware('auth')
  Route.get('cuadre-productos/:id', 'CuadroProductoController.get_cuadre').middleware('auth')
  Route.get('cuadre-productos/client/:id', 'CuadroProductoController.get_client_cuadres').middleware('auth')
  //POST
  Route.post('cuadre-productos/crear', 'CuadroProductoController.create_cuadre').middleware('auth')
  //PUT
  Route.put('cuadre-productos/:id/update', 'CuadroProductoController.update_cuadre').middleware('auth')
  //DELETE
  Route.delete('cuadre-productos/:id/delete', 'CuadroProductoController.delete_cuadre').middleware('auth')
  //======================================================================================================================================
  //Rutas
  //======================================================================================================================================
  //GET
  Route.get('rutas', 'RutaController.get_all_rutas').middleware('auth')
  Route.get('rutas/:id', 'RutaController.get_ruta').middleware('auth')
  Route.get('rutas/comentario/:ruta_id', 'RutaController.get_comments').middleware('auth')
  Route.get('rutas/:id/basic', 'RutaController.get_ruta_basic').middleware('auth')
  //POST
  Route.post('rutas/crear', 'RutaController.create_ruta').middleware('auth')
  Route.post('rutas/comentario', 'RutaController.create_comment').middleware('auth')
  //PUT
  Route.put('rutas/:id/update', 'RutaController.update_ruta').middleware('auth')
  //DELETE
  Route.delete('rutas/:id/delete', 'RutaController.delete_ruta').middleware('auth')
  //======================================================================================================================================
  //Municipios
  //======================================================================================================================================
  //GET
  Route.get('municipios', 'MunicipioController.get_all_municipios').middleware('auth')
  Route.get('municipios/:id', 'MunicipioController.get_municipio').middleware('auth')
  //POST
  Route.post('municipios/crear', 'MunicipioController.create_municipio').middleware('auth')
  //PUT
  Route.put('municipios/:id/update', 'MunicipioController.update_municipio').middleware('auth')
  //DELETE
  Route.delete('municipios/:id/delete', 'MunicipioController.delete_municipio').middleware('auth')
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
  //GET
  Route.get('clientes', 'ClienteController.get_all_clientes').middleware('auth')
  Route.get('clientes/:id', 'ClienteController.get_cliente').middleware('auth')
  Route.get('clientes/:id/cuadre-viajes', 'ClienteController.get_cuadres_viajes').middleware('auth')
  Route.get('clientes/:id/cuadre-productos', 'ClienteController.get_cuadres_productos').middleware('auth')
  Route.get('clientes/:id/cuadre-servicios', 'ClienteController.get_cuadres_servicios').middleware('auth')
  //POST
  Route.post('clientes/crear', 'ClienteController.create_cliente').middleware('auth')
  //PUT
  Route.put('clientes/:id/update', 'ClienteController.update_cliente').middleware('auth')
  //DELETE
  Route.delete('clientes/:id/delete', 'ClienteController.delete_cliente').middleware('auth')
  //======================================================================================================================================
  //Consolidaciones
  //======================================================================================================================================
  //GET
  Route.get('consolidaciones', 'ConsolidacionController.get_all_consolidaciones').middleware('auth')
  Route.get('consolidaciones/:id', 'ConsolidacionController.get_consolidacion').middleware('auth')
  Route.get('consolidaciones/:cliente_id/crear', 'ConsolidacionController.create_consolidacion').middleware('auth')
  Route.get('consolidaciones/:consolidacion_id/add-viaje/cuadre_viaje_id', 'ConsolidacionController.add_viaje').middleware('auth')
  Route.get('consolidaciones/:consolidacion_id/add-cuadre-producto/:cuadre_producto_id', 'ConsolidacionController.add_producto').middleware('auth')
  
  //PUT
  Route.put('consolidaciones/:id/update', 'ConsolidacionController.update_consolidacion').middleware('auth')
  //DELETE
  Route.delete('consolidaciones/:id/delete', 'ConsolidacionController.delete_consolidacion').middleware('auth')
  //======================================================================================================================================
  //Cuadre viaje
  //======================================================================================================================================
  //GET
  Route.get('cuadre-viajes', 'CuadroViajeController.get_all_cuadres').middleware('auth')
  Route.get('cuadre-viajes/:id', 'CuadroViajeController.get_cuadre').middleware('auth')
  Route.get('cuadre-viajes/:id/vehiculo/:vehiculo_id', 'CuadroViajeController.assign_vehiculo').middleware('auth')
  Route.get('cuadre-viajes/:id/ruta/:ruta_id', 'CuadroViajeController.assign_ruta').middleware('auth')
  //POST
  Route.post('cuadre-viajes/crear', 'CuadroViajeController.create_cuadre').middleware('auth')
  //PUT
  Route.put('cuadre-viajes/:id/update', 'CuadroViajeController.update_cuadre').middleware('auth')
  //DELETE
  Route.delete('cuadre-viajes/:id/delete', 'CuadroViajeController.delete_cuadre').middleware('auth')
  //======================================================================================================================================
  //
  //======================================================================================================================================
 
  //Servicio
  Route.get('cuadre-servicio', 'CuadroServicioController.todos').middleware('auth')
  Route.post('cuadre-servicio/crear', 'CuadroServicioController.crearCuadre').middleware('auth')
  //Cuadre final
  Route.get('cuadre-final', 'CuadroFinalController.todos').middleware('auth')
  Route.post('cuadre-final/crear', 'CuadroFinalController.crearCuadre').middleware('auth')
  Route.put('cuadre-final/:id/editar', 'CuadroFinalController.alterarCuadre').middleware('auth')
}).prefix('api')


