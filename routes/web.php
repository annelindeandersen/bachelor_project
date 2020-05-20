<?php

use Illuminate\Support\Facades\Route;

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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::view('/{path?}', 'index');

Route::post('/sendPasswordResetEmail',function(){
    //   $details = [
    //   'title'=> 'You have arequested a change of password',
    //   'body'=> 'this is your link' 
    //  ];
    //  \Mail::to('fionasdevemail$gmail.com')->send(new \App\Mail\PasswordResetMail($details));
    //  echo 'Email has been sent';
  });
