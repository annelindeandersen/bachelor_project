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
            $table->foreign('country_id')->references('id')->on('countries');
            // $table->integer('profile_id')->unsigned();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('restaurants')->insert([
            [
                'name' => 'Mamma Mia Pizza',
                'email' => 'mamma@mia.com',
                'phone' => '81904217',
                'address' => 'Finsensvej 103',
                'city' => 'Copenhagen',
                'postcode' => '2000',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fpizza3.jpg?alt=media&token=3aaec8d8-37e2-4e7e-8ad7-7cacd8f96870',
                'password' => '11111',
            ],
            [
                'name' => 'Pasta Palace',
                'email' => 'pasta@palace.com',
                'phone' => '77527442',
                'address' => 'Kingosgade 78',
                'city' => 'Copenhagen',
                'postcode' => '1000',
                'country_id' => '2',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fpasta.jpg?alt=media&token=0e2db40f-b94a-4da2-a0f1-a1a358a47a2e',
                'password' => '11111',
            ],
            [
                'name' => 'Taco King',
                'email' => 'taco@king.com',
                'phone' => '88740410',
                'address' => 'Rantzausgade 66',
                'city' => 'Copenhagen',
                'postcode' => '1800',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Ftacos.jpg?alt=media&token=efdfe5d4-a0bd-4150-957e-b3d1bb657bb8',
                'password' => '11111',
            ],
            [
                'name' => 'Soul Food',
                'email' => 'soul@food.com',
                'phone' => '60166368',
                'address' => 'Falkoner Alle 34',
                'city' => 'Copenhagen',
                'postcode' => '2000',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fveggie-burger.jpg.jpg?alt=media&token=3fd812c0-9989-4571-a8a5-b8554cf62e2c',
                'password' => '11111',
            ],
            [
                'name' => 'Cindy´s Pies',
                'email' => 'cindys@pies.com',
                'phone' => '76097502',
                'address' => 'Købmagergade 62',
                'city' => 'Copenhagen',
                'postcode' => '1550',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fpumkinpie.jpg?alt=media&token=7a8752fd-23e6-471c-8d81-82cf78d8026f',
                'password' => '11111',
            ],
            [
                'name' => 'Asian Sensation',
                'email' => 'asian@palace.com',
                'phone' => '79602788',
                'address' => 'Won Ton Street 10',
                'city' => 'Copenhagen',
                'postcode' => '2100',
                'country_id' => '2',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fasian-veg.jpg?alt=media&token=678b4933-ede6-4941-87e2-03bdeac942ee',
                'password' => '11111',
            ],
            [
                'name' => 'Sushi Mania',
                'email' => 'sushi@mania.com',
                'phone' => '70335165',
                'address' => 'Østerbrogade 78',
                'city' => 'Copenhagen',
                'postcode' => '2200',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fsushi.jpg?alt=media&token=221574a3-5c86-419a-8cb6-00fd625536da',
                'password' => '11111',
            ],
            [
                'name' => 'Curry Nation',
                'email' => 'curry@food.com',
                'phone' => '56924054',
                'address' => 'Prinsessegade 55',
                'city' => 'Copenhagen',
                'postcode' => '1850',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Findian.jpg?alt=media&token=d83ae11a-5748-4671-811d-9122ab7ebcc0',
                'password' => '11111',
            ],
            [
                'name' => 'Bangkok',
                'email' => 'bangkok@food.com',
                'phone' => '11012895',
                'address' => 'Godthåbsvej 11',
                'city' => 'Copenhagen',
                'postcode' => '2000',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fdumplings.jpg?alt=media&token=b04e59ed-fa97-4182-a4d8-9633cf24c937',
                'password' => '11111',
            ],
            [
                'name' => 'Poki Poki',
                'email' => 'poki@food.com',
                'phone' => '94817497',
                'address' => 'Sønder Boulevard 9',
                'city' => 'Copenhagen',
                'postcode' => '1800',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fpokebowl.jpg?alt=media&token=7937652c-e134-40ed-9a9b-e251f95d929e',
                'password' => '11111',
            ],
            [
                'name' => 'Big Tuna',
                'email' => 'bigtuna@food.com',
                'phone' => '11712395',
                'address' => 'Thungade 31',
                'city' => 'Copenhagen',
                'postcode' => '1850',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fasiandish.jpg?alt=media&token=65409aed-1fc5-4643-a86d-742e9250a180',
                'password' => '11111',
            ],
            [
                'name' => 'Easy Greasy',
                'email' => 'easygreasy@food.com',
                'phone' => '94557499',
                'address' => 'Silkegade 39',
                'city' => 'Copenhagen',
                'postcode' => '1900',
                'country_id' => '1',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fgreasy-burger.jpg?alt=media&token=7ad86aa9-c74f-4b0c-ab60-3e25797b2815',
                'password' => '11111',
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
