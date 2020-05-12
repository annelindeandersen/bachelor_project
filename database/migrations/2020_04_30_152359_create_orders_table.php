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
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedInteger('restaurant_id');
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
            $table->integer('total_amount');
            $table->dateTime('delivery_time', 0);
            $table->integer('accepted');
            $table->integer('status');
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('orders')->insert([
            [
                'user_id'=> '1',
                'restaurant_id'=> '2',
                'total_amount'=> '100',
                'delivery_time'=> '2020-05-10 18:00:00',
                'accepted'=> 0,
                'status' => 0
            ],
            [
                'user_id'=> '2',
                'restaurant_id'=> '1',
                'total_amount'=> '150',
                'delivery_time'=> '2020-05-10 19:15:00',
                'accepted'=> 1,
                'status' => 1
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
