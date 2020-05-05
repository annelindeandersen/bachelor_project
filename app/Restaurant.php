<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    public function country()
    {
        return $this->belongsTo('App\Country');
    }

    public function category()
    {
        return $this->belongsToMany('App\Category', 'restaurants_to_category');
    }

    public function menu()
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
        'name', 'email', 'password',
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
