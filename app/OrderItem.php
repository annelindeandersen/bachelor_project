<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    public function order()
    {
        return $this->belongsTo('App\Order');
    }

    public function menu_item() {
        return $this->belongsTo('App\MenuItem');
    }
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id', 'menu_item_id'
    ];
}
