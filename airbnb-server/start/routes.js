'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/users', 'UserController.create') // cria usuario
Route.post('/sessions', 'SessionController.create') // autenticação usuario
Route.resource('properties', 'PropertyController') // todas rotas dos metodos do crud imovel com autenticação
  .apiOnly()
  .middleware('auth')
Route.post('properties/:id/images', 'ImageController.store') // registrar imagens
  .middleware('auth')
Route.get('images/:path', 'ImageController.show') // mostrar imagens
