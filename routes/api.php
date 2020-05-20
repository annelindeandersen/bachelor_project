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
    Route::post('restaurantRegister', 'RestaurantAuthController@restaurantRegister');
    Route::post('restaurantLogin', 'RestaurantAuthController@restaurantLogin');

    
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
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

//RESTAURANTS FLOW ************************************************

//add profile details / POST
Route::post('/createProfile/{id}', 'RestaurantController@createProfile');

//add menu item/ POST
Route::post('/addMenuItem/{id}', 'MenuController@addMenuItem');

//add menu item/ POST
Route::post('/addMenuItem/{id}', 'MenuController@addMenuItem');

//add menu options eg. started/ GET
Route::get('/getMenuOptions', 'MenuController@getMenuOptions');

//add menu items by id/ GET
Route::get('/getMenu/{id}', 'MenuController@getMenu');

//add menu items by id/ POST
Route::delete('/deleteMenuItem/{id}', 'MenuController@deleteMenuItem');

//get menu item options for select dropdown
Route::get('/getMenuItemTypes', 'MenuController@getMenuItemTypes');

//get countries options for select dropdown
Route::get('/getCountries', 'RestaurantController@getCountries');

//get all categories for select tags
Route::get('/getcategories', 'RestaurantController@getCategories');

// //add to cart
// Route::post('/addToCart/{id}', 'CartController@addToCart');

//get orders
Route::get('/getOrders/{id}', 'OrderController@getOrders');

//accept order
Route::post('/acceptOrder/{id}', 'OrderController@acceptOrder');

//reject order
Route::post('/rejectOrder/{id}', 'OrderController@rejectOrder');

//set status in progress
Route::post('/orderInProgress/{id}', 'OrderController@setStatusInProgress');

Route::get('/ordersInProgress/{id}', 'OrderController@getOrdersInProgress');

//set status as dispatched  
Route::post('/ordersforDispatch/{id}', 'OrderController@setStatusDispatched');

Route::get('/ordersforDispatch/{id}', 'OrderController@getOrdersDispatched');

//get accepted orders
Route::get('/getAcceptedOrders/{id}', 'OrderController@getAcceptedOrders');

//get received orders
Route::get('/getNewOrders/{id}', 'OrderController@getNewOrders');

//check session id
Route::post('/getRestaurantData/{id}', 'RestaurantController@getRestaurantData');

//get single restaurant details / GET
Route::get('/getRestaurant/{id}', 'RestaurantController@getRestaurant');

//add menu items by id/ GET
Route::get('/getMenu/{id}', 'MenuController@getMenu');

//add menu items by id/ GET
Route::get('/getMenuItemTypes', 'MenuController@getMenuItemTypes');

Route::post('/restaurantLogout', 'RestaurantAuthController@restaurantLogout');

Route::post('/restaurantPasswordReset/{key}', 'RestaurantAuthController@restaurantPasswordReset');

Route::post('/sendPasswordResetEmail', 'RestaurantAuthController@sendPasswordResetEmail');

Route::post('/reset', 'RestaurantAuthController@resetPassword');

Route::post('/updateProfile', 'RestaurantController@updateProfile');

