<?php

namespace RST\Resq\Infrastructure;

class ContactRepository extends AbstractRepository {
    protected $repositoryTable = 'contacts';

    public function getContactsByUserId($userId)
    {
        $query = 'SELECT * FROM contacts WHERE user_id = ' . intval($userId) . ';';
        return $this->getDb()->query($query);
    }
}