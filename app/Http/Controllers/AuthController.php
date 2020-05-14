<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use App\Cart;
class AuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'phone' => 'required|string|unique:users',
            'address' => 'required|string',
            'city' => 'required|string',
            'postcode' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);
        $user = new User([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'postcode' => $request->postcode,
            'password' => bcrypt($request->password)
        ]);
        $user->save();
        
        // create a cart for the new user
        $thisuser = User::where('email', '=', $request->email)->first();
        $cart = new Cart([
            'user_id' => $thisuser->id,
        ]);
        $cart->save();

        return response()->json([
            'message' => 'Successfully created user!',
            'cart' => $cart
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
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Change password for the user
     *
     * @param  [string] user
     * @param  [string] password
     * @param  [string] new_password
     */
    public function password(Request $request)
    {
        $request->validate([
            'password' => 'required|string'
        ]);
        
        $user = $request->user;
        $password = $request->password;
        $new_password = $request->new_password;
        $password_confirm = $request->confirm_password;

        $current_user = User::where('id', '=', $user)->first();

        if ($new_password === $password_confirm){
            // hash password and update user
            $current_user->update(['password' => bcrypt($new_password)]);
            $current_user->save();
        }
        
        return response()->json('Succes, password changed!');
    }

    /**
     * Change user details
     *
     * @param  [string] user
     * @param  [string] email
     * @param  [string] phone
     * @param  [string] address
     * @param  [string] city
     * @param  [string] postcode
     */
    public function update(Request $request)
    {
        $request->validate([
            'first_name' => 'string',
            'last_name' => 'string',
            'email' => 'string|email|unique:users',
            'phone' => 'string|unique:users',
            'address' => 'string',
            'city' => 'string',
            'postcode' => 'string',
        ]);
        
        $user = $request->user;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $phone = $request->phone;
        $email = $request->email;
        $address = $request->address;
        $city = $request->city;
        $postcode = $request->postcode;

        $current_user = User::where('id', '=', $user)->first();

        if (isset($first_name)){
            $current_user->update(['first_name' => $first_name]);
            $current_user->save();
        }
        if (isset($last_name)){
            $current_user->update(['last_name' => $last_name]);
            $current_user->save();
        }
        if (isset($email)){
            $current_user->update(['email' => $email]);
            $current_user->save();
        }
        if (isset($phone)){
            $current_user->update(['phone' => $phone]);
            $current_user->save();
        }
        if (isset($address)){
            $current_user->update(['address' => $address]);
            $current_user->save();
        }
        if (isset($city)){
            $current_user->update(['city' => $city]);
            $current_user->save();
        }
        if (isset($postcode)){
            $current_user->update(['post$postcode' => $postcode]);
            $current_user->save();
        }
        
        return response()->json('Succes, user details were updated!');
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