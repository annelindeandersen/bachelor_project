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

        // get the order for the user
        $orders = Order::where('user_id', '=', $user)->get();

        $ordersArray = array();
        $order_items_Array = array();

        foreach($orders as $order) {

            // get the menu items that match the order items
            $order_items = OrderItem::where('order_id', '=', $order->id)->get();

            foreach($order_items as $order_item) {
                $order_items_Array[] = ([
                    'menu_item' => $order_item->menu_item
                ]);
            }

            // array of order with the matching menu items
            $orderArray[] = ([
                'order' => $order,
                'restaurant' => $order->restaurant,
                'order_items' => $order_items_Array
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
