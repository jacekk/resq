<?php

namespace RST\Resq\Api;

class Contacts extends ApiAbstract {

    public function get() {

        $this->requireAuth();

        die('Do someting authorized');
    }

    public function put()
    {
        die('put method');
    }

}