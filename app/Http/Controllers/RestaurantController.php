<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
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
        $restaurants = Restaurant::with('country', 'profile', 'category')->get();
       
        return response()->json($restaurants);
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
        $categories = Category::with('restaurants.category')->where('category', '=', $categoryRequest)->get();

        return response()->json($categories);
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

    //RESTAURANT FLOW *********************************************************************************


         //get reataurant by id for dashboard page
         
         public function getRestaurant(Request $request)
         {

            $restaurants = Restaurant::all();
            $encryptedId = $request->id;
            //echo  $encryptedId;
            $decryptedId = Crypt::decryptString($encryptedId);
            echo  $decryptedId;
        
            // $restaurant = Restaurant::where('email', '=', $decryptedId)->first();
            //        return response()->json([
            //     'data' => $restaurant,
            // ], 200);
         

         }

             //create a restaurant profile
          //add menu item
          public function createProfile(Request $request, $id) 
          {
             $profile = new RestaurantProfile([
                 'restaurant_id' => $id,
                 'description' => $request->description,
                 'logo' => $request->logo,
                 'opening_hour' => $request->opening_hour,
                 'closing_hour' => $request->closing_hour
             ]);

          //    $file = Request::file('image');
          //    $file->move(public_path('/uploads/'. $request->image));
          //    Image::make(public_path('/uploads/'. $request->image))->resize(300,300)->save(public_path('/uploads/'. $request->image));

             $profile->save();
             return response()->json([
                 'message' => 'Successfully saved menu',
                 'data'=>  $profile
             ], 201);
         }

             //get countries
             public function getCountries(Request $request)
             {
                 $countryArray =  Country::all();
                  return $countryArray;
              }  

}
