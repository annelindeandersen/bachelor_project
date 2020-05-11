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
        $user = $request->user;
        $cart = Cart::where('user_id', '=', $user)->first();
        $cartArray = array();

        $cart_items = CartItem::where('cart_id', '=', $cart->id)->get();

        $cart_items_array = array();
        $price_array = array();

        // get the menu item from cart item
        foreach($cart_items as $cart_item) {
            $cart_items_array[] = ([
                'menu_item' => $cart_item->menu_item
            ]);
            $price_array[] = ($cart_item->menu_item->price);
        }

        $cartArray = ([
            'cart' => $cart,
            'user' => $cart->user,
            'items' => $cart_items_array,
            'price_array' => $price_array,
            'total' => array_sum($price_array),
        ]);

        return response()->json($cartArray);
    }

    /**
     * Add to cart for logged in user
     *
     * @return [json] cart object
     */
    public function addcart(Request $request)
    {
        $user_id = $request->user;
        $menu_item_id = $request->menu_item;

        $cart = Cart::where('user_id', '=', $user_id)->first();

        $cart_item = new CartItem([
            'cart_id' => $cart->id,
            'menu_item_id' => $menu_item_id,
        ]);
        $cart_item->save();

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
