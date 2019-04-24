<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/player/{containerId}', ['as' => 'player.show', 'uses' => 'PlayerController@show']);

Route::get('/{any}', 'CatchAllController@index')->where('any', '.*');
