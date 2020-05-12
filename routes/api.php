<?php

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// User
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

// Restaurant auth
Route::post('/registerrestaurant', 'RestaurantAuthController@restaurantRegister');
Route::post('/loginrestaurant', 'RestaurantAuthController@restaurantLogin');

// Restaurants
Route::get('/getrestaurants', 'RestaurantController@restaurant');
Route::get('/getselected', 'RestaurantController@selectedrestaurant');
Route::get('/country', 'RestaurantController@country');
Route::get('/getcategories', 'RestaurantController@categories');
Route::get('/getcategory', 'RestaurantController@category');
Route::get('/getprofile', 'RestaurantController@profile');

// Menu
Route::get('/getmenu', 'MenuController@menu');

// Cart
Route::get('/getcart', 'CartController@cart');
Route::get('/getcarts', 'CartController@carts');
Route::post('/addtocart', 'CartController@addcart');
Route::get('/gettotal', 'CartController@total');
Route::post('/deleteall', 'CartController@deleteall');
Route::post('/deleteone', 'CartController@deleteone');

// Orders
Route::post('/payment', 'OrderController@payment');
Route::post('/createorder', 'OrderController@create');
Route::get('/getorder', 'OrderController@getorder');