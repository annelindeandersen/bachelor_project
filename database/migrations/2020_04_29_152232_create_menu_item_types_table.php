<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuItemTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_item_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type');
            $table->timestamps();
        });

        DB::table('menu_item_types')->insert([
            [
                'type'=> 'Starter',
            ],
            [
                'type'=> 'Main',
            ],
            [
                'type'=> 'Food',
            ],
            [
                'type'=> 'Snack',
            ],
            [
                'type'=> 'Dessert',
            ],
            [
                'type'=> 'Beverage',
            ],
            [
                'type'=> 'Extra',
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
        Schema::dropIfExists('menu_item_types');
    }
}
