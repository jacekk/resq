<?php

namespace RST\Resq\Api;

use RST\Resq\Domain\User;
use RST\Resq\Infrastructure\UserRepository;

class Login extends ApiAbstract {

    public function get() {


        // Logout user
        $session = \Flight::get('session');
        $segment = $session->getSegment('Auth');


        $segment->set('email', false);
        $segment->set('id', false);

        $session->commit();

        $this->apiSuccess(200, 'You`ve been logged out');
    }

}