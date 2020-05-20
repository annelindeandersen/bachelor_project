<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class PasswordApiKey extends Model
{
    protected $primaryKey = 'restaurant_id';
        //* The attributes that are mass assignable.
    //*
    // * @var array
    // */
    protected $fillable = ['restaurant_id', 'api_key' ];
}