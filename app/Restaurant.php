<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Restaurant as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Restaurant extends Model
{
    use Notifiable;
    
    public function country()
    {
        return $this->belongsTo('App\Country');
    }

    public function category()
    {
        return $this->belongsToMany('App\Category', 'restaurants_to_category');
    }

    public function menu_order()
    {
        return $this->belongsToMany('App\MenuItem', 'menu_items');
    }

    public function profile()
    {
        return $this->hasOne('App\RestaurantProfile');
    }
 
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'address', 'phone', 'city', 'postcode', 'country_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
