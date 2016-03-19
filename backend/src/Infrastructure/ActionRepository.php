<?php

namespace RST\Resq\Infrastructure;

use RST\Resq\Domain\Action;

class ActionRepository extends AbstractRepository {
    const HASH_CONST = 'jflkejfkljds324234er3242r524f';
    protected $repositoryTable = 'actions';

    public function setStatus($actions, $status)
    {
        if (count($actions)) {
            $this->getDb()->query('UPDATE actions SET status = ' . intval($status) . ' WHERE id IN ( ' . implode(',', $actions) . ')');
        }
    }

    public function getActionsByPhone($phone)
    {
        return $this->getDb()->query('SELECT a.*, u.telephone FROM actions a LEFT JOIN users u ON u.id = a.user_id
          WHERE u.telephone = \'' . addslashes($phone) .'\'
          AND a.status = ' . Action::STATUS_ACTIVE);
    }

    public function getOpenActions($userId)
    {
        return $this->getDb()->query('SELECT a.*, u.telephone FROM actions a LEFT JOIN users u ON u.id = a.user_id
          WHERE u.id = \'' . (int) $userId .'\'
          AND a.status != ' . Action::STATUS_DISABLED);
    }

    public function getByHash($hash)
    {
        return $this->getDb()->query(
            'SELECT * FROM actions
            WHERE SHA1(CONCAT(user_id, id, \'' . self::HASH_CONST  . '\')) = \'' . $hash .'\'');
    }
}