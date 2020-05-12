<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Cart;
use App\MenuItem;
use App\CartItem;
use App\Order;
use App\OrderItem;

class OrderController extends Controller
{
    /**
     * get order for user
     *
     * @return [json] order object
     */
    public function getorder(Request $request) {
        $user = $request->user;

        $orders = Order::where('user_id', '=', $user)->get();
        $ordersArray = array();

        foreach($orders as $order) {
            $orderArray[] = ([
                'order' => $order,
                'order_item' => $order->order_item
            ]);
        }

        return response()->json($orderArray);
    }

    /**
     * create order for user
     *
     * @return [json] order object
     */
    public function create(Request $request)
    {
        $user = $request->id;
        $restaurant = $request->restaurant;
        $date = $request->date;

        $cart = Cart::where('user_id', '=', $user)->first();
        $orderArray = array();

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

        // create new order (works)
        $new_order = new Order([
            'user_id' => $user,
            'restaurant_id' => $restaurant,
            'total_amount' => array_sum($price_array),
            'delivery_time' => $date,
            'accepted' => 0,
            'status' => 0
        ]);
        $new_order->save();
        
        // get the order just created
        $order = Order::where('user_id', '=', $user)->where('delivery_time', '=', $date)->first();

        foreach($cart_items as $cart_item){
            //create new order items
            $new_order_items = new OrderItem([
                'order_id' => $order->id,
                'menu_item_id' => $cart_item->menu_item->id,
            ]);
            $new_order_items->save();
        }

        return response()->json('The order and order items were created');
    }
}
