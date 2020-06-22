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
    Route::post('password', 'AuthController@password');
    Route::post('update', 'AuthController@update');
    Route::post('restaurantRegister', 'RestaurantAuthController@restaurantRegister');
    Route::post('restaurantLogin', 'RestaurantAuthController@restaurantLogin');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

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
Route::get('/test', 'OrderController@test');

//RESTAURANTS FLOW ************************************************

Route::get('/getCountries', 'RestaurantController@getCountries');
Route::get('/getcategories', 'RestaurantController@getCategories');

Route::post('/createProfile/{id}', 'RestaurantController@createProfile');
Route::post('/addMenuItem/{id}', 'MenuController@addMenuItem');
Route::post('/addMenuItem/{id}', 'MenuController@addMenuItem');
Route::get('/getMenuOptions', 'MenuController@getMenuOptions');
Route::get('/getMenu/{id}', 'MenuController@getMenu');
Route::delete('/deleteMenuItem/{id}', 'MenuController@deleteMenuItem');
Route::get('/getMenuItemTypes', 'MenuController@getMenuItemTypes');


Route::post('/acceptOrder', 'OrderController@acceptOrder');
Route::post('/rejectOrder', 'OrderController@rejectOrder');

Route::post('/orderInProgress', 'OrderController@setStatusInProgress');
Route::get('/ordersInProgress', 'OrderController@getOrdersInProgress');

Route::post('/ordersforDispatch', 'OrderController@setStatusDispatched');
Route::get('/ordersforDispatch', 'OrderController@getOrdersDispatched');

Route::get('/getAcceptedOrders', 'OrderController@getAcceptedOrders');
Route::get('/getNewOrders', 'OrderController@getNewOrders');

Route::get('/getRestaurant', 'RestaurantController@getRestaurant');
Route::get('/getMenu/{id}', 'MenuController@getMenu');
Route::get('/getMenuItemTypes', 'MenuController@getMenuItemTypes');
Route::post('/restaurantLogout', 'RestaurantAuthController@restaurantLogout');
Route::post('/restaurantPasswordReset/{key}', 'RestaurantAuthController@restaurantPasswordReset');
Route::post('/sendPasswordResetEmail', 'RestaurantAuthController@sendPasswordResetEmail');
Route::post('/reset', 'RestaurantAuthController@resetPassword');
Route::post('/updateProfile', 'RestaurantController@updateProfile');

Route::post('/uploadLogo', 'RestaurantController@uploadLogo');
Route::post('/uploadBanner', 'RestaurantController@uploadBanner');
Route::post('/addCategory', 'RestaurantController@addCategory');
Route::post('/removeCategory', 'RestaurantController@removeCategory');
Route::post('/getSelectedCategories', 'RestaurantController@getSelectedCategories');
Route::post('/getMonthlyRevenue', 'RestaurantController@getMonthlyRevenue');