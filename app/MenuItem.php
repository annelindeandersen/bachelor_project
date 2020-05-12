<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    public function restaurant()
    {
        return $this->belongsTo('App\Restaurant');
    }

    public function type()
    {
        return $this->belongsTo('App\MenuItemType', 'menu_item_type_id');
    }

    public function cart_item() {
        return $this->belongsTo('App\CartItem');
    }

    public function order_item() {
        return $this->belongsTo('App\OrderItem');
    }
}
