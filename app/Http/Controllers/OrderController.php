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
        // $order_items = OrderItem::where('order_id', '=', )

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

    // restaurant section ******************************************************************************


     // get new order by restaurant id
     public function getNewOrders(Request $request, $id)
     {         
       $aReceivedOrders = Order::with('user', 'order_item.menu_item')
       ->where('restaurant_id', '=', $id)
       ->where('status', '=', 0)
       ->where('accepted', '=', 0)
       ->orderBy('delivery_time', 'asc')
       ->get();

       return response()->json($aReceivedOrders);
     }
   


          // get accepted order by restaurant id
          public function getAcceptedOrders(Request $request, $id)
          {
            $aAcceptedOrders = Order::with('user', 'order_item.menu_item')
            ->where('restaurant_id', '=', $id)
            ->where('status', '=', 0)
            ->where('accepted', '=', 1)
            ->orderBy('delivery_time', 'asc')
            ->get();
            
            // foreach($aAcceptedOrders as $order)
            // {
            //     echo $order->order_item->groupBy('menu_item_id');
            // }

           return response()->json( $aAcceptedOrders);

          }
    
        //get order in progress
        public function getOrdersInProgress(Request $request, $id)
        {         
            $aOrdersInPorgress = Order::with('user', 'order_item.menu_item')
            ->where('restaurant_id', '=', $id)
            ->where('status', '=', 1)
            ->where('accepted', '=', 1)
            ->orderBy('delivery_time', 'asc')
            ->get();

            return response()->json($aOrdersInPorgress);
        }
    
    //get order in dispatched
    public function getOrdersDispatched(Request $request, $id)
    {         
        $aOrdersInPorgress = Order::with('user', 'order_item.menu_item')
        ->where('restaurant_id', '=', $id)
        ->where('status', '=', 2)
        ->where('accepted', '=', 1)
        ->orderBy('delivery_time', 'asc')
        ->get();

        return response()->json($aOrdersInPorgress);
    }

    //accept order by restaurant id
    public function acceptOrder(Request $request, $id)
    {
        $order = Order::where('id', $id)
        ->update(['accepted' => 1]);
        return response()->json([
            'message' => 'Order has been Accepted',
        ], 201);
    }


    //reject order by restaurant id
    public function rejectOrder(Request $request, $id)
    {
        $order = Order::where('id', $id)
        ->update(['accepted' => -1]);
        return response()->json([
            'message' => 'Order has been Rejected',
        ], 201);
    }

        //set order status in progress
        public function setStatusInProgress(Request $request, $id)
        {
            $order = Order::where('id', $id)
            ->update(['status' => 1]);
            return response()->json([
                'message' => 'Order is in progress',
            ], 201);
        }

        //set order status in progress
        public function setStatusDispatched(Request $request, $id)
        {
            $order = Order::where('id', $id)
            ->update(['status' => 2]);
            return response()->json([
                'message' => 'Order is dispatched',
            ], 201);
        }


}
