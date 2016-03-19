<?php

namespace RST\Resq\Infrastructure;

use RST\Resq\Domain\User;

class UserRepository extends AbstractRepository {
    protected $repositoryTable = 'users';

    public function fetchEntity($userId)
    {
        $user = $this->fetch($userId);

        $userEntity = new User();
        $userEntity->exchangeArray($user);

        return $userEntity;
    }
}