<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('category');
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('categories')->insert([
            [
                'category' => 'Vegetarian'
            ],
            [
                'category' => 'Italian'
            ],
            [
                'category' => 'Vegan'
            ],
            [
                'category' => 'Mexican'
            ],
            [
                'category' => 'Pizza'
            ],
            [
                'category' => 'Burger'
            ],
            [
                'category' => 'Cake'
            ],
            [
                'category' => 'Japanese'
            ],
            [
                'category' => 'Sushi'
            ],
            [
                'category' => 'Thai'
            ],
            [
                'category' => 'Indian'
            ],
            [
                'category' => 'French'
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
        Schema::dropIfExists('categories');
    }
}
