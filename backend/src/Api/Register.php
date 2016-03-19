<?php

namespace RST\Resq\Api;

use RST\Resq\Domain\User;
use RST\Resq\Infrastructure\UserRepository;

class Register extends ApiAbstract {

    public function post() {

        $user = new User();
        $userRepository = new UserRepository(\Flight::db());

        $postData = \Flight::request()->data;

        try {
            $this->requiredFields($postData, array('email', 'password', 'telephone'));
        } catch (ApiProblem $e) {
            return $this->apiProblem(self::UNPROCESSABLE_ENTITY, 'Register', $e->getMessage());
        }

        // Check if user is already registered
        $userCheck = $userRepository->fetchStmt(null, 'email = \'' . addslashes($postData->email) .'\'');

        if ($userCheck->rowCount() > 0) {
            return $this->apiProblem(self::UNPROCESSABLE_ENTITY, 'Register', 'User already exists');
        }

        $user->setEmail($postData->email);
        $user->setPassword($postData->password);
        $user->setTelephone($postData->telephone);
        $user = $userRepository->persist($user);

        $this->setStatus(201);
        return $user->getArrayCopy(false);

    }

}