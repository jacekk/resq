<?php

namespace RST\Resq\Infrastructure;

class AbstractRepository {

    protected $repositoryTable;

    protected $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function save($entity)
    {
        $data = $entity->getArrayCopy();

        $this->getDb()-.
    }

    public function prepareColsAndVals($data)
    {
        $insert = array();
        foreach($data as $col => $value) {
            $insert[] = "`{$col}` = '" . addslashes($value) . "'";
        }

        return implode(', ', $insert);
    }

    protected function getDb()
    {
        return $this->db;
    }


}