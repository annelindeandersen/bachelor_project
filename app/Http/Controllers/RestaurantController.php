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
        // $restaurantWithProfile = Restaurant::with('profile')
        $restaurants = Restaurant::with('country', 'profile', 'category')->get();

        $restaurant_array = [];

        foreach($restaurants as $restaurant) {
            if($restaurant->profile !== null) {
                $restaurant_array[] = ([
                    'restaurant' => $restaurant,
                    'country' => $restaurant->country,
                    'category' => $restaurant->category,
                    'profile' => $restaurant->profile
                ]);
            }
        }
       
        return response()->json($restaurant_array);
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
        $encryptedEmail = $request->id;
        $decryptedEmail = Crypt::decryptString($encryptedEmail);
        $restaurant = Restaurant::with('profile')->where('email', '=', $decryptedEmail)->first();
            return response()->json([
            'restaurant' => $restaurant,
    ], 200);
    }
    //create a restaurant profile
    public function createProfile(Request $request, $id)
    {
        $imageName = $id.'.jpg';
        if(!$request->description){return 'Please enter a description';}
        if(!$request->opening_hour){return 'Please enter a opening_hour';}
        if(!$request->closing_hour){return 'Please enter a closing_hour';}
        $profile = new RestaurantProfile([
            'restaurant_id' => $id,
            'description' => $request->description,
            'logo' => $imageName,
            'opening_hour' => $request->opening_hour,
            'closing_hour' => $request->closing_hour
        ]);
        $categories  = $request->categories;
        foreach ($categories as &$category) {
            echo $category;
            RestaurantsToCategory::firstOrCreate([
                'restaurant_id' => $id,
                'category_id' => $category,
            ]);
        }
        $image = $request->logo;
        if(!$image){return 'Please enter a description';}
        File::put('img/'.$imageName, base64_decode($image));
        $profile->save();
        return response()->json([
            'message' => 'Successfully saved menu',
            'data'=>  $profile,
            'categories'=>  $categories
        ], 201);
    }
    //update profile
    public function updateProfile(Request $request)
    {
        $id = $request->id;
        $restaurantData = Restaurant::with('profile')->find($id);
        // echo $restaurantData;

        $editableFields = [];
        if($request->name){ array_push($editableFields, 'name');}
        if($request->email){ array_push($editableFields, 'email');}
        if($request->phone){ array_push($editableFields, 'phone');}
        if($request->address){ array_push($editableFields, 'address');}
        if($request->city){ array_push($editableFields, 'city');}
        if($request->postcode){ array_push($editableFields, 'postcode');}
        if($request->country_id){ array_push($editableFields, 'country_id');}
        if($request->image){ array_push($editableFields, 'image');}

        $profileEditableFields = [];
        if($request->description){ array_push($profileEditableFields, 'description');}
        if($request->logo){ array_push($profileEditableFields, 'logo');}
        if($request->opening_hour){ array_push($profileEditableFields, 'opening_hour');}
        if($request->closing_hour){ array_push($profileEditableFields, 'closing_hour');}

        // profile update if not exists
        if($restaurantData->profile == null){
            $newProfile = new RestaurantProfile([
                'restaurant_id' => $id,
                'description' => $request->description,
                'logo' => $request->logo,
                'opening_hour' => $request->opening_hour,
                'closing_hour' => $request->closing_hour,
            ]);
            $newProfile->save();
            return 'Success in creating';
        } else {
            // profile update when exists
            $profileFieldsToUpdate = $request->only($profileEditableFields);
            $restaurantData->profile->fill($profileFieldsToUpdate);
            $restaurantData->profile->save();

             // restaurant update
            $fieldsToUpdate = $request->only($editableFields);
            $restaurantData->fill($fieldsToUpdate);
            $restaurantData->save();

            return $restaurantData;
        }
        // $categories  = $request->categories;
        // foreach ($categories as $category) {
        //     // echo $category;
        //     RestaurantsToCategory::firstOrCreate([
        //         'restaurant_id' => $id,
        //         'category_id' => $category,
        //     ]);
        // }

        // return $restaurantData;
    }
    //get countries for select
    public function getCountries(Request $request)
    {
        $countryArray =  Country::all();
        return $countryArray;
    }
    //get categories for select
    public function getCategories(Request $request)
    {
        $categoryArray =  Category::all();
        return $categoryArray;
    }
}
