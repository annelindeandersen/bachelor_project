<?php

namespace Tests\Unit;

use Tests\TestCase;

class RouteTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testﬁ()
    {
        $response = $this->call('GET', '/getcategories');
        $this->assertEquals(200, $response->status());
    }
}
