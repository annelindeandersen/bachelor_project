<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\User;

class CreateUser extends TestCase

{
    /**
     *add a user 
     *
     * @return void
     */
    public function createUser()
    {
        $response  = $this->post('/auth/signup', [
            'first_name' => 'Bjorn',
            'last_name' => ' Testssen',
            'phone' => '1212100',
            'email'=> 'bjorn@gmail.com',
            'address'=> 'Aboulevard 23',
            'city' => 'Copenhagen',
            'postcode' => '2344'
        ]);
        $response->assertOk();
        $this->assertCount(1, User::all());
    }
}
