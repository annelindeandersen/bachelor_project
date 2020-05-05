<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Restaurant;
use App\Country;
use App\Category;
use App\RestaurantProfile;

class RestaurantController extends Controller
{

    /**
     * Get all restaurants
     *
     * @return [json] restaurants object
     */
    public function restaurant(Request $request)
    {
        $restaurants = Restaurant::all();
        $allRestaurants = array();

        foreach ($restaurants as $key =>  $restaurant ) {
            $allRestaurants[] = ([
                'restaurant' => $restaurant,
                'country' => $restaurant->country,
                'category' => $restaurant->category[0],
                'profile' => $restaurant->profile,
            ]);
        }
        return response()->json($allRestaurants);
    }

    /**
     * Get one selected restaurant
     *
     * @return [json] restaurant object
     */
    public function selectedrestaurant(Request $request)
    {
        $selected = $request->id;
        $restaurant = Restaurant::where('id', '=', $selected)->first();
        $selectedRestaurant = array();

        $selectedRestaurant = ([
            'restaurant' => $restaurant,
            'country' => $restaurant->country,
            'category' => $restaurant->category,
            'profile' => $restaurant->profile,
        ]);

        return response()->json($selectedRestaurant);
    }

    /**
     * Get all categories
     *
     * @return [json] categories
     */
    public function categories(Request $request)
    {
        $categories = Category::all();
        return $categories;
    }

    /**
     * Get the category
     *
     * @return [json] category
     */
    public function category(Request $request)
    {
        $categoryRequest = $request->category;

        // get restaurants with category
        $categories = Category::where('category', '=', $categoryRequest)->get();

        $getrestaurants = array();
        
        foreach ($categories as $key => $category) {
            $getrestaurants[] = ([
                'restaurant' => $category->restaurants,
                'category' => $category->category,
                ]);
        }
        return response()->json($getrestaurants);
    }

    /**
     * Get the profile
     *
     * @return [json] profile
     */
    public function profile(Request $request) 
    {
        $restaurants = Restaurant::all();
        
        foreach ($restaurants as $key =>  $restaurant ) {
            echo response()->json([
                'restaurant' => $restaurant,
                'profile' => $restaurant->profile,
            ]);
        }

    }
}
