<?php

// use App\Http\Controllers\NewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
   
    Route::get('/news/search', 'NewController@search')->where('search', '.*');
    Route::get('/news/addAllToIndex', 'NewController@addAllToIndex');
    Route::get('/news/createIndex', 'NewController@createIndex');
    Route::get('/news/index', 'NewController@index');
    Route::get('/news/show/{id}', 'NewController@show');
    Route::get('/news/category/{category}', 'NewController@getNewsByCategory');
});
