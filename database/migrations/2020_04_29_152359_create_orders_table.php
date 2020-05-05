<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->integer('restaurant_id')->unsigned();
            $table->integer('total_amount');
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('orders')->insert([
            [
                'user_id'=> '1',
                'restaurant_id'=> '2',
                'total_amount'=> '100',
            ],
            [
                'user_id'=> '2',
                'restaurant_id'=> '1',
                'total_amount'=> '150',
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
        Schema::dropIfExists('orders');
    }
}
