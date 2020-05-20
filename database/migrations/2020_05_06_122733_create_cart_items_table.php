<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('cart_id')->unsigned();
            $table->foreign('cart_id')->references('id')->on('users');
            $table->integer('menu_item_id')->unsigned();
            $table->foreign('menu_item_id')->references('id')->on('menu_items');
            $table->timestamps();
        });

        DB::table('cart_items')->insert([
            [
                'cart_id'=> '1',
                'menu_item_id'=> '1',
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
        Schema::dropIfExists('cart_items');
    }
}
