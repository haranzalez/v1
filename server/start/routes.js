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

  Route.get('users', 'UserController.index');
  Route.post('users/create', 'UserController.create');
  Route.delete('users/destroy/:id', 'UserController.destroy');
  Route.patch('users/update/:id', 'UserController.update');

  Route.get('roles', 'RoleController.index');
  Route.post('roles/create', 'RoleController.create');
  Route.delete('roles/destroy/:id', 'RoleController.destroy');
  Route.patch('roles/update/:id', 'RoleController.update');
  
}).prefix('api')


