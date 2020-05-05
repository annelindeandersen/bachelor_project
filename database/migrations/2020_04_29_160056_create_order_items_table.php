<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->integer('order_id')->unsigned();
            $table->integer('menu_id')->unsigned();
            $table->integer('menu_item_id')->unsigned();
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('order_items')->insert([
            [
                'order_id'=> '1',
                'menu_id'=> '2',
                'menu_item_id'=> '1'
            ],
            [
                'order_id'=> '2',
                'menu_id'=> '1',
                'menu_item_id'=> '2'
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
        Schema::dropIfExists('order_items');
    }
}
