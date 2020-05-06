<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurant_profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->string('logo');
            $table->time('opening_hour');
            $table->time('closing_hour');
            $table->bigInteger('restaurant_id')->unsigned()->unique();
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('restaurant_profiles')->insert([
            [
                'description'=> 'This restaurant sells pizza',
                'logo'=> '1.jpg',
                'opening_hour'=> '12',
                'closing_hour'=> '22',
                'restaurant_id'=> '1'
            ],
            [
                'description'=> 'This restaurant sells pasta',
                'logo'=> '2.jpg',
                'opening_hour'=> '10',
                'closing_hour'=> '21',
                'restaurant_id'=> '2'
            ],
            [
                'description'=> 'This restaurant sells tacos',
                'logo'=> '3.jpg',
                'opening_hour'=> '10',
                'closing_hour'=> '21',
                'restaurant_id'=> '3'
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('restaurant_profiles');
    }
}
