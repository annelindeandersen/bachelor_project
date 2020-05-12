<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Relationship extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //users
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('address');
            $table->string('phone')->unique();
            $table->string('city');
            $table->string('postcode');
            $table->rememberToken();
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('users')->insert([
            [
                'name'=> 'Anne',
                'email'=> 'anne_linde@yahoo.dk',
                'phone'=> '29647715',
                'address'=> 'Dalgas Boulevard 89',
                'city'=> 'Frederiksberg',
                'postcode'=> '2000',
                'password'=> '1234',
            ],
            [
                'name'=> 'Fiona',
                'email'=> 'fiona@gmail.com',
                'phone'=> '172635',
                'address'=> 'Borgskrivervej 7',
                'city'=> 'København N',
                'postcode'=> '2400',
                'password'=> '1234',
            ],
        ]);
        //countries
        Schema::create('countries', function($table){
            $table->increments('id', true)-> unsigned();
            $table->string('name');

            $table->engine = 'InnoDb';
        });
        DB::table('countries')->insert([
            [
                'name'=> 'Denmark'
            ],
            [
                'name'=> 'Sweden'
            ]
        ]);
//restaurants
        Schema::create('restaurants', function($table){
            $table->increments('id', true)-> unsigned();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->unique();
            $table->string('address');
            $table->string('city');
            $table->string('postcode');
            $table->integer('country_id')->unsigned();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('restaurants')->insert([
            [
                'name'=> 'Pizza',
                'email'=> 'a@a.com',
                'phone'=> '11111',
                'address'=> 'a street',
                'city'=> 'Cph',
                'postcode'=> '1212',
                'country_id'=> '1',
                'password'=> '11111',
            ],
            [
                'name'=> 'Pasta',
                'email'=> 'b@b.com',
                'phone'=> '22222',
                'address'=> 'b street',
                'city'=> 'Cph',
                'postcode'=> '1000',
                'country_id'=> '2',
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
        Schema::dropIfExists('countries');
        Schema::dropIfExists('restaurants');
    }
}
