<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ResponseTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->json('POST', '/acceptOrder', ['id' => 4]);
        $response->assertStatus(201)
        ->assertJson([
            'message' => 'Order is in progress',
        ], 201);
        // $this->assertTrue(true);
    }
}
