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
    public function getorder(Request $request)
    {

        $user = $request->user;

        $orders = Order::with('restaurant')
            ->where('user_id', '=', $user)
            ->orderBy('id', 'desc')
            ->get();

        $newArray = array();

        foreach ($orders as $order) {

            $order_items = OrderItem::with('menu_item')
                ->where('order_id', '=', $order->id)
                ->get()
                ->groupBy('menu_item.title')
                ->toArray();

            $newArray[] = ([
                'order' => $order,
                'items' => $order_items
            ]);
        }

        return response()->json($newArray);
    }


    /**
     * TEST TEST TEST
     *
     * @return [json] order object
     */
    public function test(Request $request)
    {
        // for fetching all orders of a user

        // $user = $request->user;

        $orders = Order::with('order_item.menu_item', 'restaurant')
            ->where('user_id', '=', $user)
            ->orderBy('id', 'desc')
            ->get();

        // return response()->json($orders->toArray());

        $user = $request->user;

        $orders = Order::with('restaurant')->where('user_id', '=', $user)->orderBy('id', 'desc')->get();

        $newArray = array();

        foreach ($orders as $order) {

            $order_items = OrderItem::with('menu_item')
                ->where('order_id', '=', $order->id)
                ->get()
                ->groupBy('menu_item.title');

            $newArray[] = ([
                'order' => $order,
                'items' => $order_items
            ]);
        }

        return response()->json($newArray);

        // $orders = Order::where('user_id', '=', $user)->first();

        // $newOrdersArray = array_merge($order_items->toArray());

        // $newArray = array();

        // foreach ($newOrdersArray as $newOrderArray) {

        //     $newArray[] = ([
        //         'order' => $newOrderArray
        //         // 'order' => $newOrderArray->groupBy('id')
        //     ]);
        // }

        // return response()->json($newArray);



        // for CART and payment page -> one specific order/cart
        $user = $request->user;

        $orders = Order::where('user_id', '=', $user)
            ->first();
        // $orders = Order::where('user_id', '=', $user)->first();
        $order_items = OrderItem::with('menu_item')
            ->where('order_id', '=', $orders->id)
            ->orderBy('id', 'desc')
            ->get()
            ->groupBy('menu_item.title');

        // return response()->json($order_items);
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

        $cart_items = CartItem::with('menu_item')->where('cart_id', '=', $cart->id)->get();

        $price_array = array();

        // get the menu item price from cart item
        foreach ($cart_items as $cart_item) {
            $price_array[] = ($cart_item->menu_item->price);
        }

        // create new order
        $new_order = new Order([
            'user_id' => $user,
            'restaurant_id' => $restaurant,
            'total_amount' => array_sum($price_array),
            'delivery_time' => $date,
            'accepted' => 0,
            'status' => 0
        ]);
        $new_order->save();

        foreach ($cart_items as $cart_item) {
            //create new order items
            $new_order_items = new OrderItem([
                'order_id' => $new_order->id,
                'menu_item_id' => $cart_item->menu_item->id,
            ]);
            $new_order_items->save();
        }

        // get full order just placed
        $fullOrder = Order::with('order_item.menu_item', 'restaurant')->find($new_order->id);
        return response()->json($fullOrder);
    }

    // restaurant section ******************************************************************************
     // get new order by restaurant id
    public function getNewOrders(Request $request)
    {
        $id = $request->id;
        $aReceivedOrders = Order::with('user', 'order_item.menu_item')
            ->where('restaurant_id', '=', $id)
            ->where('status', '=', 0)
            ->where('accepted', '=', 0)
            ->orderBy('delivery_time', 'asc')
            ->get();
        return response()->json($aReceivedOrders);
    }
          // get accepted order by restaurant id
    public function getAcceptedOrders(Request $request)
    {
        $id = $request->id;
        $aAcceptedOrders = Order::with('user', 'order_item.menu_item')
            ->where('restaurant_id', '=', $id)
            ->where('status', '=', 0)
            ->where('accepted', '=', 1)
            ->orderBy('delivery_time', 'asc')
            ->get();
        return response()->json($aAcceptedOrders);
    }
        //get order in progress
    public function getOrdersInProgress(Request $request)
    {
        $id = $request->id;
        $aOrdersInPorgress = Order::with('user', 'order_item.menu_item')
            ->where('restaurant_id', '=', $id)
            ->where('status', '=', 1)
            ->where('accepted', '=', 1)
            ->orderBy('delivery_time', 'asc')
            ->get();
        return response()->json($aOrdersInPorgress);
    }
    //get order in dispatched
    public function getOrdersDispatched(Request $request)
    {
        $id = $request->id;
        $aOrdersInPorgress = Order::with('user', 'order_item.menu_item')
            ->where('restaurant_id', '=', $id)
            ->where('status', '=', 2)
            ->where('accepted', '=', 1)
            ->orderBy('delivery_time', 'asc')
            ->get();
        return response()->json($aOrdersInPorgress);
    }
    //accept order by restaurant id
    public function acceptOrder(Request $request)
    {
        $id = $request->id;
        $order = Order::where('id', $id)
            ->update(['accepted' => 1]);
        return response()->json([
            'message' => 'Order has been Accepted',
        ], 201);
    }
    //reject order by restaurant id
    public function rejectOrder(Request $request)
    {
        $id = $request->id;
        $order = Order::where('id', $id)
            ->update(['accepted' => -1]);
        return response()->json([
            'message' => 'Order has been Rejected',
        ], 201);
    }
        //set order status in progress
    public function setStatusInProgress(Request $request)
    {
        $id = $request->id;
        $order = Order::where('id', $id)
            ->update(['status' => 1]);
        return response()->json([
            'message' => 'Order is in progress',
        ], 201);
    }
        //set order status in progress
    public function setStatusDispatched(Request $request)
    {
        $id = $request->id;
        $order = Order::where('id', $id)
            ->update(['status' => 2]);
        return response()->json([
            'message' => 'Order is dispatched',
        ], 201);
    }
}