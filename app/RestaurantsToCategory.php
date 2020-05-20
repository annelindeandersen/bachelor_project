<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RestaurantsToCategory extends Model
{
    public $table = 'restaurants_to_category';
        //* The attributes that are mass assignable.
    //*
    // * @var array
    // */
    protected $fillable = ['restaurant_id', 'category_id' ];
}
