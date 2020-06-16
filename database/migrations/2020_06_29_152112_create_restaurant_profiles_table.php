<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurant_profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->string('logo');
            $table->time('opening_hour');
            $table->time('closing_hour');
            $table->unsignedInteger('restaurant_id');
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
            $table->timestamps();

            $table->engine = 'InnoDb';
        });

        DB::table('restaurant_profiles')->insert([
            [
                'description' => 'This restaurant sells pizza',
                'logo' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fmamamia.jpg?alt=media&token=aa668854-e7f8-4aa0-8ac0-ed11f7ebdc5f',
                'opening_hour' => '12:00:00',
                'closing_hour' => '22:00:00',
                'restaurant_id' => '1'
            ],
            [
                'description' => 'This restaurant sells pasta',
                'logo' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fpastapalace.jpg?alt=media&token=6bd40047-dcae-40df-a0b0-730eff14b471',
                'opening_hour' => '10:00:00',
                'closing_hour' => '21:00:00',
                'restaurant_id' => '2'
            ],
            [
                'description' => 'This restaurant sells tacos',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Ftacoking.jpg?alt=media&token=c42728c2-aab2-40a2-8e7c-650b2a7029b1',
                'opening_hour' => '10:00:00',
                'closing_hour' => '21:00:00',
                'restaurant_id' => '3'
            ],
            [
                'description' => 'This restaurant sells vegan food',
                'logo' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fsoulfood.jpg?alt=media&token=58bab1df-9cf2-4ad1-8530-d43a51f3eae6',
                'opening_hour' => '12:00:00',
                'closing_hour' => '22:00:00',
                'restaurant_id' => '4'
            ],
            [
                'description' => 'This restaurant sells pies',
                'logo' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fcindys.jpg?alt=media&token=84942429-8394-49bd-9ab9-1a5a01d50fa2',
                'opening_hour' => '10:00:00',
                'closing_hour' => '21:00:00',
                'restaurant_id' => '5'
            ],
            [
                'description' => 'This restaurant sells Asian food',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fasian.jpg?alt=media&token=5d587d4d-e4f4-4d0d-ada7-d34a17e7c331',
                'opening_hour' => '10:00:00',
                'closing_hour' => '21:00:00',
                'restaurant_id' => '6'
            ],
            [
                'description' => 'This restaurant sells sushi',
                'logo' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fsushimania.jpg?alt=media&token=6e2c3dd8-e500-4748-a8f1-e10ca981e4eb',
                'opening_hour' => '12:00:00',
                'closing_hour' => '22:00:00',
                'restaurant_id' => '7'
            ],
            [
                'description' => 'This restaurant sells Indian food',
                'logo' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fcurrynation.jpg?alt=media&token=754e4a66-c005-429a-9404-49cbf0de8495',
                'opening_hour' => '10:00:00',
                'closing_hour' => '21:00:00',
                'restaurant_id' => '8'
            ],
            [
                'description' => 'This restaurant sells Thai food',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fbangkok.jpg?alt=media&token=ab847f69-83bb-47e3-b1c7-df5895e968e7',
                'opening_hour' => '10:00:00',
                'closing_hour' => '21:00:00',
                'restaurant_id' => '9'
            ],
            [
                'description' => 'This restaurant sells Asian food',
                'logo' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fpokipoki.jpg?alt=media&token=b050ff23-09e0-46bb-9726-99204992ac12',
                'opening_hour' => '12:00:00',
                'closing_hour' => '22:00:00',
                'restaurant_id' => '10'
            ],
            [
                'description' => 'This restaurant sells sushi',
                'logo' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Fbigtuna.jpg?alt=media&token=80a6372e-8bb4-4d08-bf3b-fe3526a77954',
                'opening_hour' => '10:00:00',
                'closing_hour' => '21:00:00',
                'restaurant_id' => '11'
            ],
            [
                'description' => 'This restaurant sells burgers',
                'image' => 'https://firebasestorage.googleapis.com/v0/b/delivr-72594.appspot.com/o/images%2Feasygreasy.jpg?alt=media&token=41d4eb4f-7e06-4acf-9034-082bac118743',
                'opening_hour' => '10:00:00',
                'closing_hour' => '21:00:00',
                'restaurant_id' => '12'
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
        Schema::dropIfExists('restaurant_profiles');
    }
}
