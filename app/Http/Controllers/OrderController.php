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

        $orders = Order::with('order_item.menu_item', 'restaurant')->where('user_id', '=', $user)->get();

        return response()->json($orders->toArray());
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

        $cart_items = CartItem::with('menu_item')->where('cart_id', '=', $cart->id)->get();

        $price_array = array();

        // get the menu item price from cart item
        foreach($cart_items as $cart_item) {
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
        // $order = Order::where('user_id', '=', $user)->where('delivery_time', '=', $date)->first();

        foreach($cart_items as $cart_item){
            //create new order items
            $new_order_items = new OrderItem([
                'order_id' => $new_order->id,
                'menu_item_id' => $cart_item->menu_item->id,
            ]);
            $new_order_items->save();
        }

        // get full order just placed
        $fullOrder = Order::with('order_item.menu_item', 'restaurant')->find($new_order->id);
        // $fullOrder = Order::with('order_item.menu_item', 'restaurant')->where('user_id', '=', $user)->where('delivery_time', '=', $date)->first();
        return response()->json($fullOrder);
    }

    // restaurant section ********************************************************************************

    //get all orders by restaruant id
    public function getOrders(Request $request, $id)
    {
        $orderArray = array();
        $orderArray = Order::where('restaurant_id', '=', $id)->get();
        // echo $orderArray;
        $orderItems = array();
        foreach($orderArray as $order) {
            $orderItems =  $orderItemsArray =  $order->order_item;
            }
        $menuItemsArray = array();
        foreach($orderItems as $orderItem) {
            $menuItemsArray[] = ([
                'menu_item' => $orderItem->menu_item
            ]);
        }
        $fullOrderArray = array();
        $fullOrderArray = ([
            'order_details' => $orderArray
        ]);
        return response()->json($fullOrderArray);
        }
        //accept order by
        public function acceptOrder(Request $request, $id)
        {
            $order = Order::where('id', $id)
            ->update(['accepted' => 1]);
            return response()->json([
                'message' => 'Order has been Accepted',
            ], 201);
        }
        //reject order
        public function rejectOrder(Request $request, $id)
        {
            $order = Order::where('id', $id)
            ->update(['accepted' => -1]);
            return response()->json([
                'message' => 'Order has been Rejected',
            ], 201);
        }
}
