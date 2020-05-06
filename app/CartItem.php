<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    public function cart() {
        return $this->belongsTo('App\Cart');
    }

    public function menu_item() {
        return $this->belongsToMany('App\MenuItem');
    }
}
