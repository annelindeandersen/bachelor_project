<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    public function user() {
        return $this->belongsTo('App\User');
    }

    public function cart_item() {
        return $this->hasMany('App\CartItem');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id'
    ];

}
