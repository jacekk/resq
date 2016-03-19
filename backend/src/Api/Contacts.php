<?php

namespace RST\Resq\Api;

class Contacts extends ApiAbstract {

    protected $userId;

    public function init() {
        $this->userId = $this->requireAuth();
    }

    public function get() {

    }

    public function put()
    {
        $postData = \Flight::request()->splat;
    }

}