<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    public function restaurant()
    {
        return $this->belongsToMany('App\Restaurant', 'country_id');
    }
}
