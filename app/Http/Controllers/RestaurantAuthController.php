<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Encryption\DecryptException;
use App\Restaurant;

class RestaurantAuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] phone
     * @param  [string] address
     * @param  [string] city
     * @param  [string] postcode
     * @param  [string] country_id      
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function restaurantRegister(Request $request)
    {
        // $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'required|string|email|unique:restaurants',
        //     // 'phone' => 'required|string|phone',
        //     // 'address' => 'required|string|address',
        //     // 'city' => 'required|string|city',
        //     // 'postcode' => 'required|string|postcode',
        //     // 'country_id' => 'required|string|country',
        //     'password' => 'required|string|confirmed'
        // ]);
        $restaurant = new Restaurant([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'country_id' => $request->country_id,
            'postcode' => $request->postcode,
            // 'profile_id' => 1,
            'password' => Hash::make($request->password)
        ]);
        $restaurant->save();

        // echo 'hello';

        return response()->json([
            'message' => 'Successfully created a restaurant!'
        ], 201);
    }
  
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function restaurantLogin(Request $request)
    {
        // $request->validate([
        //     'email' => 'required|string|email',
        //     'password' => 'required|string',
        //     'remember_me' => 'boolean'
        // ]);
        // $credentials = request(['email', 'password']);
    
        $restaurant = Restaurant::where('email', '=', $request->email)->first();

        if (Auth::guard('restaurant')->attempt(['email' => $request->email , 'password' => $request->password])) {

        // echo $restaurant;

        if (Hash::check($request->password, $restaurant->password)) {
            echo 'they match';
        }
        
     }
     
    //     //  if ($restaurant->password !== decrypt($request->password)) {
    //     //      echo 'password fail';
    //     //  }
    //     //  echo $request->get('password');
    // //     $details = Auth::guard('restaurant')->user();
    // //     // $user = $details['original'];
    // //     return 'auth success';
    // // } else {
    // //     return 'auth fail';
    // //     echo $request->password;
    // }
            // return response()->json([
            //     'message' => 'Unauthorized'
            // ], 401);
        // $restaurant = $request->restaurant();
        // $tokenResult =  $restaurant->createToken('Personal Access Token');
        // $token = $tokenResult->token;
        // if ($request->remember_me)
        //     $token->expires_at = Carbon::now()->addWeeks(1);
        // $token->save();
        // return response()->json([
        //     'access_token' => $tokenResult->accessToken,
        //     'token_type' => 'Bearer',
        //     'expires_at' => Carbon::parse(
        //         $tokenResult->token->expires_at
        //     )->toDateTimeString()
        // ]);
    }
}
