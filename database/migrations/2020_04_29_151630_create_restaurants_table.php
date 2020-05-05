<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurants', function(Blueprint $table){
            $table->increments('id', true)-> unsigned();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->unique();
            $table->string('address');
            $table->string('city');
            $table->string('postcode');
            $table->string('image')->default('default.jpg');
            $table->integer('country_id')->unsigned();
            $table->integer('profile_id')->unsigned();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('restaurants')->insert([
            [
                'name'=> 'Mamma Mia Pizza',
                'email'=> 'a@a.com',
                'phone'=> '11111',
                'address'=> 'a street',
                'city'=> 'Cph',
                'postcode'=> '1212',
                'country_id'=> '1',
                'profile_id'=> '1',
                'password'=> '11111',
            ],
            [
                'name'=> 'Pasta Palace',
                'email'=> 'b@b.com',
                'phone'=> '22222',
                'address'=> 'b street',
                'city'=> 'Cph',
                'postcode'=> '1000',
                'country_id'=> '2',
                'profile_id'=> '2',
                'password'=> '11111',
            ],
            [
                'name'=> 'Taco King',
                'email'=> 'c@c.com',
                'phone'=> '33333',
                'address'=> 'c street',
                'city'=> 'Cph',
                'postcode'=> '1000',
                'country_id'=> '1',
                'profile_id'=> '3',
                'password'=> '11111',
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('restaurants');
    }
}
