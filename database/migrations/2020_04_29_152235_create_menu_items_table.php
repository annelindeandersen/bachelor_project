<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('restaurant_id');
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
            $table->integer('menu_item_type_id')->unsigned();
            $table->foreign('menu_item_type_id')->references('id')->on('menu_item_types');
            $table->string('title');
            $table->string('description');
            $table->float('price', 8, 2);
            $table->string('image')->default('https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fimg-coming.jpg?alt=media&token=3d3e7454-023c-4fac-a416-ba78d1fcf49f');
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('menu_items')->insert([
            [
                'restaurant_id' => '1',
                'menu_item_type_id' => '2',
                'title' => 'Pizza Margerita',
                'description' => 'Pizza with tomato sauce and mozzarella',
                'price' => '60',
                'image' => 'margerita.jpg',
            ],
            [
                'restaurant_id' => '2',
                'menu_item_type_id' => '3',
                'title' => 'Pasta Bolognese',
                'description' => 'Pasta with tomato and beef bolognese',
                'price' => '70',
                'image' => 'bolognese.jpg',
            ],
            [
                'restaurant_id' => '1',
                'menu_item_type_id' => '2',
                'title' => 'Pizza Vegetario',
                'description' => 'Pizza with tomato sauce, veggies and mozzarella',
                'price' => '60',
                'image' => 'margerita.jpg',
            ],
            [
                'restaurant_id' => '2',
                'menu_item_type_id' => '3',
                'title' => 'Pasta Alfredo',
                'description' => 'Pasta with creamy cheese sauce',
                'price' => '70',
                'image' => 'bolognese.jpg',
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
        Schema::dropIfExists('menu_items');
    }
}
