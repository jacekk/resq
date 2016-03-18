<?php

namespace RST\Resq\Api;

use RST\Resq\Domain\User;
use RST\Resq\Infrastructure\UserRepository;

class Login extends ApiAbstract {

    public function handle() {

        $user = new User();
        $userRepository = new UserRepository(\Flight::db());

        $postData = \Flight::request()->data;
        try {
            $this->requiredFields($postData, array('email', 'password'));
        } catch (ApiProblem $e) {
            return $this->apiProblem(self::UNPROCESSABLE_ENTITY, 'Register', $e->getMessage());
        }

        // Check if user is already registered
        $userCheck = $userRepository->fetch(null, 'email = \'' . addslashes($postData->email) .'\'');

        if ($userCheck->rowCount() == 0) {
            return $this->apiProblem(self::UNPROCESSABLE_ENTITY, 'Register', 'User does not exists');
        }

        // Check credentials
        $user->setPassword($postData->password);

        $authCheck = $userRepository->fetch(null,
            "email = '{$postData->email}' AND password = '{$user->getPassword()}'");


        // Log in user
        $session = \Flight::get('session');
        $segment = $session->getSegment('Auth');

        if ($authCheck->rowCount() > 0) {

            foreach($authCheck as $user) {
                $segment->set('email', $postData->email);
                $segment->set('id', $user['id']);

                $session->commit();
            }

            return array(
                'result' => 'success',
                'session' => session_id(),
                'email' => $postData->email
            );

        } else {
            return $this->apiProblem(self::UNAUTHORIZED, 'Login', 'Password is incorrect!');
        }



    }

}