<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RestaurantProfile extends Model
{
    public function restaurant()
    {
        return $this->belongsTo('App\Restaurant');
    }

    //* The attributes that are mass assignable.
    //*
    // * @var array
    // */
    protected $fillable = ['restaurant_id', 'description', 'opening_hour', 'closing_hour', 'logo' ];
}

