<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('address');
            $table->string('phone')->unique();
            $table->string('city');
            $table->string('postcode');
            $table->rememberToken();
            $table->timestamps();

            $table->engine = 'InnoDb';
        });
        DB::table('users')->insert([
            [
                'name'=> 'Anne',
                'email'=> 'anne_linde@yahoo.dk',
                'phone'=> '29647715',
                'address'=> 'Dalgas Boulevard 89',
                'city'=> 'Frederiksberg',
                'postcode'=> '2000',
                'password'=> '1234',
            ],
            [
                'name'=> 'Fiona',
                'email'=> 'fiona@gmail.com',
                'phone'=> '172635',
                'address'=> 'Borgskrivervej 7',
                'city'=> 'København N',
                'postcode'=> '2400',
                'password'=> '1234',
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
        Schema::dropIfExists('users');
    }
}
