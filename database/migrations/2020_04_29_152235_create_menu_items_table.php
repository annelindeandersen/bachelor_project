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
            $table->id();
            $table->integer('restaurant_id')->unsigned();
            $table->integer('menu_item_type_id')->unsigned();
            $table->string('title');
            $table->string('description');
            $table->integer('price');
            $table->string('image');
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('menu_items')->insert([
            [
                'restaurant_id'=> '1',
                'menu_item_type_id'=> '2',
                'title'=> 'Pizza Margerita',
                'description'=> 'Pizza with tomato sauce and mozzarella',
                'price'=> '60',
                'image'=> 'margerita.jpg',
            ],
            [
                'restaurant_id'=> '2',
                'menu_item_type_id'=> '3',
                'title'=> 'Pasta Bolognese',
                'description'=> 'Pasta with tomato and beef bolognese',
                'price'=> '70',
                'image'=> 'bolognese.jpg',
            ],
            [
                'restaurant_id'=> '1',
                'menu_item_type_id'=> '2',
                'title'=> 'Pizza Vegetario',
                'description'=> 'Pizza with tomato sauce, veggies and mozzarella',
                'price'=> '60',
                'image'=> 'margerita.jpg',
            ],
            [
                'restaurant_id'=> '2',
                'menu_item_type_id'=> '3',
                'title'=> 'Pasta Alfredo',
                'description'=> 'Pasta with creamy cheese sauce',
                'price'=> '70',
                'image'=> 'bolognese.jpg',
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
