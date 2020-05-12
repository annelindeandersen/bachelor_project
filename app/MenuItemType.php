<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MenuItemType extends Model
{
    public function menu_item()
    {
        return $this->hasOne('App\MenuItem');
    }
}
