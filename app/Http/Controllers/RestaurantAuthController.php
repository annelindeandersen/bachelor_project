<?php
namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Encryption\DecryptException;
use App\Restaurant;
use Session;
use Illuminate\Support\Facades\Crypt;


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

        if(!$request->name){return 'Please enter a name';}
        if(!$request->email){return 'Please enter an email';}
        if(!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {return "Invalid email format";}
        if(!$request->phone){return 'Please enter a phone';}
        if(!$request->address){return 'Please enter a addess';}
        if(!$request->city){return 'Please enter a city';}
        if(!$request->postcode){return 'Please enter a postcode';}
        if(!$request->password){return 'Please enter a password';}
        if($request->password !== $request->password_confirmation){return 'Passwords must match';}

        $restaurant = new Restaurant([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'country_id' => 1,
            'postcode' => $request->postcode,
            // 'profile_id' => 1,
            'password' => Hash::make($request->password)
        ]);
        $restaurant->save();
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
        if(!$request->email){return response()->json(['error' => 'Enter an email'], 401);}
        if(!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {return response()->json(['error' => 'Enter a valid'], 401);}
        if(!$request->password){return response()->json(['error' => 'Enter a password'], 401);}

        $restaurant = Restaurant::where('email', '=', $request->email)->first();
        // echo $restaurant;

        if(!$restaurant){return response()->json(['error' => 'User does not exist'], 401);}
        if (Hash::check($request->password, $restaurant->password)) {
            Session::put('email', $restaurant->email );
            $sessionEmail = Session::get('email');

             $localStorageId = Crypt::encryptString($request->email);
            
            return response()->json([
                'session_data' => $sessionEmail, 
                'local_storage_id' =>$localStorageId, 
                'data' => $restaurant], 200);
        } else {
            return response()->json(['error' => 'Authentification failed'], 400);}


       

        
        


    
  
     
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

    //check session

    public function checkSession(Request $request, $session_id)
    {


        foreach(Session::all() as $key => $obj):
            echo $key . ": ";
            print_r($obj);
            echo "\n----------\n";
        endforeach;
       if (Session::has('YOUR_SESSION_KEY')){
      // do some thing if the key is exist
    }else{
      //the key does not exist in the session
    }
    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
         
}

