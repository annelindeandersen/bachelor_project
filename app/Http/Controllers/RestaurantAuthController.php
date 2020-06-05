<?php
namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Encryption\DecryptException;
use App\Restaurant;
use App\PasswordApiKey;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;

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
        if (!$request->name) {
            return 'Please enter a name';
        }
        if (!$request->email) {
            return 'Please enter an email';
        }
        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            return "Invalid email format";
        }
        if (!$request->phone) {
            return 'Please enter a phone';
        }
        if (!$request->address) {
            return 'Please enter a addess';
        }
        if (!$request->city) {
            return 'Please enter a city';
        }
        if (!$request->postcode) {
            return 'Please enter a postcode';
        }
        if (!$request->password) {
            return 'Please enter a password';
        }
        if ($request->password !== $request->password_confirmation) {
            return 'Passwords must match';
        }
        $restaurant = new Restaurant([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'country_id' => $request->country,
            'postcode' => $request->postcode,
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
        if (!$request->email) {
            return response()->json(['error' => 'Enter an email'], 401);
        }
        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['error' => 'Enter a valid'], 401);
        }
        if (!$request->password) {
            return response()->json(['error' => 'Enter a password'], 401);
        }
        $restaurant = Restaurant::with(['profile'])->where('email', '=', $request->email)->first();
        if (!$restaurant) {
            return response()->json(['error' => 'User does not exist'], 401);
        }
        if (Hash::check($request->password, $restaurant->password)) {
            $localStorageId = Crypt::encryptString($request->email);
            return response()->json([
                'local_storage_id' => $localStorageId,
                'restaurant' => $restaurant
            ], 200);
        } else {
            return response()->json(['error' => 'Authentification failed'], 400);
        }
    }
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function restaurantLogout(Request $request)
    {
        $encryptedEmail = $request->id;
        $decryptedEmail = Crypt::decryptString($request->id);
        echo $decryptedEmail;
    }
//send email with api key
    /**
     * password reset
     *
     * @return [json] user object
     */
    public function sendPasswordResetEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email'
        ]);
        $email = $request->email;
        $restaurant = Restaurant::where('email', '=', $request->email)->first();
        if (!$restaurant) {
            return response()->json(['message' => 'User doesnt exist    '], 401);
        }
        $api_key = implode('-', str_split(substr(strtolower(md5(microtime() . rand(1000, 9999))), 0, 30), 6));
        $details = [
            'title' => 'You have requested a change of password',
            'button_text' => 'Reset your password',
            'link' => 'http://localhost:8000/restaurant-password-reset?key=' . $api_key
        ];
        Mail::to('fionasdevemail@gmail.com')->send(new \App\Mail\PasswordResetMail($details));
        $new_api_key = new PasswordApiKey([
            'restaurant_id' => $restaurant->id,
            'api_key' => $api_key,
        ]);
        $new_api_key->save();
        return response()->json(['message' => 'Email sent'], 201);
    }
    
    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
            'password_confirmation' => 'required|string',
            'api_key' => 'required|string'
        ]);
        if ($request->password != $request->password_confirmation) {
            return 'Paswords must match';
        }
        $api_key = $request->api_key;
        $newPassword = $request->password;
        $api_key_match = PasswordApiKey::where('api_key', '=', $api_key)->first();
        if (!$api_key_match) {
            return 'Api key is invalid';
        }
        $currentTime = time();
        $restaurant = $restaurant = Restaurant::where('id', '=', $api_key_match->restaurant_id)->first();
        $restaurantId = $restaurant->id;
        $restaurant->update(['password' => Hash::make($newPassword)]);
        echo $restaurant->id;
        $api_to_delete = PasswordApiKey::where('restaurant_id', '=', $restaurant->id)->first();
        $api_to_delete->delete();
        return response()->json(['message' => 'Password updated'], 200);
    }
}