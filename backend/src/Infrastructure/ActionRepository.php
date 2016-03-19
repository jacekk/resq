<?php

namespace RST\Resq\Infrastructure;

use RST\Resq\Domain\Action;

class ActionRepository extends AbstractRepository {
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
}