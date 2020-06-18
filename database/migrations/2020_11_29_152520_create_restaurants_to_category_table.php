<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantsToCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurants_to_category', function (Blueprint $table) {
            $table->unsignedInteger('restaurant_id');
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')->on('categories');

            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('restaurants_to_category')->insert([
            [
                'restaurant_id' => '1',
                'category_id' => '2'
            ],
            [
                'restaurant_id' => '1',
                'category_id' => '5'
            ],
            [
                'restaurant_id' => '2',
                'category_id' => '1'
            ],
            [
                'restaurant_id' => '2',
                'category_id' => '2'
            ],
            [
                'restaurant_id' => '3',
                'category_id' => '4'
            ],
            [
                'restaurant_id' => '3',
                'category_id' => '1'
            ],
            [
                'restaurant_id' => '4',
                'category_id' => '3'
            ],
            [
                'restaurant_id' => '4',
                'category_id' => '6'
            ],
            [
                'restaurant_id' => '5',
                'category_id' => '7'
            ],
            [
                'restaurant_id' => '5',
                'category_id' => '12'
            ],
            [
                'restaurant_id' => '6',
                'category_id' => '8'
            ],
            [
                'restaurant_id' => '6',
                'category_id' => '9'
            ],
            [
                'restaurant_id' => '7',
                'category_id' => '8'
            ],
            [
                'restaurant_id' => '7',
                'category_id' => '9'
            ],
            [
                'restaurant_id' => '8',
                'category_id' => '11'
            ],
            [
                'restaurant_id' => '8',
                'category_id' => '1'
            ],
            [
                'restaurant_id' => '9',
                'category_id' => '10'
            ],
            [
                'restaurant_id' => '9',
                'category_id' => '1'
            ],
            [
                'restaurant_id' => '10',
                'category_id' => '1'
            ],
            [
                'restaurant_id' => '10',
                'category_id' => '3'
            ],
            [
                'restaurant_id' => '10',
                'category_id' => '8'
            ],
            [
                'restaurant_id' => '11',
                'category_id' => '8'
            ],
            [
                'restaurant_id' => '11',
                'category_id' => '9'
            ],
            [
                'restaurant_id' => '11',
                'category_id' => '10'
            ],
            [
                'restaurant_id' => '12',
                'category_id' => '6'
            ],
            [
                'restaurant_id' => '12',
                'category_id' => '1'
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
        Schema::dropIfExists('restaurants_to_category');
    }
}
