<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RestaurantsToCategory extends Model
{
    protected $table = 'restaurants_to_category';
    protected $fillable = ['restaurant_id', 'category_id' ];
    
}
