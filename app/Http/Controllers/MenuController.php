<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Restaurant;
use App\MenuItem;
use App\MenuItemType;

class MenuController extends Controller
{
    /**
     * Get menu for each restaurant
     *
     * @return [json] restaurant object
     */
    public function menu(Request $request)
    {
        // get menu for clicked restaurant
        $restaurant = $request->id;

        // get all menu items of restaurant id
        $menu_items = MenuItem::where('restaurant_id', '=', $restaurant)->get();
        
        // create array to store full menu in
        $fullMenu = array();

        // get menu items with type: starter
        $starter_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '1']
        ])->get();

        // get menu items with type: snack
        $snack_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '4']
        ])->get();

        // get menu items with type: main
        $main_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '2']
        ])->get();

        // get menu items with type: food
        $food_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '3']
        ])->get();

        // get menu items with type: dessert
        $dessert_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '5']
        ])->get();

        // get menu items with type: beverage
        $beverage_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '6']
        ])->get();

        // get menu items with type: extra
        $extra_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '7']
        ])->get();

        // set full menu
        $fullMenu[] = ([
            'starter' => ['Starter', $starter_type],
            'snack' => ['Snack', $snack_type],
            'main' => ['Main', $main_type],
            'food' => ['Food', $food_type],
            'dessert' => ['Dessert', $dessert_type],
            'beverage' => ['Beverage', $beverage_type],
            'extra' => ['Extra', $extra_type],
        ]);

        return response()->json($fullMenu);
    }

    //RESTAURANT FLOW
            //add menu item
    public function addMenuItem(Request $request, $id)
    {
        if (!$request->menu_item_type_id) {
            return response()->json(['message' => 'Enter a menu type id']);
        }
        if (!$request->title) {
            return response()->json(['message' => 'Enter a title']);
        }
        if (!$request->description) {
            return response()->json(['message' => 'Enter a description']);
        }
        if (!$request->price) {
            return response()->json(['message' => 'Enter a proce']);
        }
        if (!$request->image) {
            return response()->json(['message' => 'Enter an logo image']);
        }
        $menuItem = new MenuItem([
            'restaurant_id' => $id,
            'menu_item_type_id' => $request->menu_item_type_id,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $request->image
        ]);
            //    $file = Request::file('image');
            //    $file->move(public_path('/uploads/'. $request->image));
            //    Image::make(public_path('/uploads/'. $request->image))->resize(300,300)->save(public_path('/uploads/'. $request->image));
        $menuItem->save();
        return response()->json([
            'message' => 'Successfully saved menu',
            'data' => $menuItem
        ], 201);
    }
           //get menu types
    public function getMenuItemTypes(Request $request)
    {
        $menuTypesArray = MenuItemType::all();
        return $menuTypesArray;
    }
              //get menu item
    public function getMenu(Request $request, $restaurant_id)
    {
        $aMenuItems = MenuItem::where([
            ['restaurant_id', '=', $restaurant_id]
        ])->get();
        // get starters
        $aStarters = MenuItem::where([
            ['restaurant_id', '=', $restaurant_id],
            ['menu_item_type_id', '=', '1']
        ])->get();
            // get mains
        $aMains = MenuItem::where([
            ['restaurant_id', '=', $restaurant_id],
            ['menu_item_type_id', '=', '2']
        ])->get();
            // get deserts
        $aSnacks = MenuItem::where([
            ['restaurant_id', '=', $restaurant_id],
            ['menu_item_type_id', '=', '4']
        ])->get();
                // get deserts
        $aDesserts = MenuItem::where([
            ['restaurant_id', '=', $restaurant_id],
            ['menu_item_type_id', '=', '5']
        ])->get();
            // get deserts
        $aBeverages = MenuItem::where([
            ['restaurant_id', '=', $restaurant_id],
            ['menu_item_type_id', '=', '6']
        ])->get();
                     // get deserts
        $aExtras = MenuItem::where([
            ['restaurant_id', '=', $restaurant_id],
            ['menu_item_type_id', '=', '7']
        ])->get();
        // set full menu
        $fullMenu[] = ([
            'starter' => $aStarters,
            'snack' => $aSnacks,
            'main' => $aMains,
            'dessert' => $aDesserts,
            'beverage' => $aBeverages,
            'extra' => $aExtras
        ]);
        return response()->json($fullMenu);
    }
        //del menu types
    public function deleteMenuItem(Request $request, $id)
    {
        $menuItem = MenuItem::find($id);
        $menuItem->delete();
        return response()->json([
            'message' => $menuItem->title . ' was deleted'
        ]);
    }
}