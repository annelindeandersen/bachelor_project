<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasswordApiKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('password_api_keys', function (Blueprint $table) {
            $table->integer('restaurant_id')->unsigned()->unique();
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
            $table->string('api_key')->unique();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('password_api_keys');
    }
}