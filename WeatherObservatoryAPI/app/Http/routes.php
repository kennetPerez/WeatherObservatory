<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');
Route::get('/api/v1/people', 'People@index');
Route::get('/api/v1/services', 'Services@index');
Route::get('/api/v1/stations', 'Stations@index');

Route::post('/api/v1/people/login', 'People@login');
Route::post('/api/v1/people/register', 'People@store');
Route::post('/api/v1/people/change_pass', 'People@changePass');
Route::delete('/api/v1/people/{id}', 'People@destroy');