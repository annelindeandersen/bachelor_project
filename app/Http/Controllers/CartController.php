<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Restaurant;
use App\MenuItem;
use App\CartItem;
use App\Cart;

class CartController extends Controller
{
    /**
     * Get cart for logged in user
     *
     * @return [json] cart object
     */
    public function cart(Request $request)
    {
        $selected = $request->id;
        $cart = Cart::where('user_id', '=', '1')->first();
        $cartArray = array();

        $cartArray = ([
            'cart' => $cart,
            'user' => $cart->user,
            'items' => $cart->cart_item,
        ]);

        return response()->json($cartArray);
    }

    /**
     * Get carts with cart items for all users
     *
     * @return [json] cart object
     */
    public function carts(Request $request)
    {
        $carts = Cart::all();
        $cartArray = array();

        foreach($carts as $cart) {
            $cartArray[] = ([
                'cart' => $cart,
                'user' => $cart->user,
                'items' => $cart->cart_item,
            ]);
        }

        return response()->json($cartArray);
    }
}
