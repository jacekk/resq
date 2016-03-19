<?php

namespace RST\Resq\Infrastructure;

class AbstractRepository {

    protected $repositoryTable;

    protected $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function persist($entity)
    {
        $data = $entity->getArrayCopy();

        $this->getDb()->query('INSERT INTO ' . $this->repositoryTable .' SET ' . $this->prepareColsAndVals($data));

        $entity->setId($this->getDb()->lastInsertId());

        return $entity;
    }

    public function delete($entity, $where = null)
    {
        return $this->getDb()->query(
            'DELETE FROM ' . $this->repositoryTable .'
            WHERE ' . ($where ? $where : 'id = ' . $entity->getId()));
    }

    public function update($entity, $where = null)
    {
        $data = $entity->getArrayCopy();
        return $this->getDb()->query(
            'UPDATE ' . $this->repositoryTable .' SET ' . $this->prepareColsAndVals($data) .'
            WHERE ' . ($where ? $where : ' id = ' . $entity->getId())
        );
    }

    public function fetchStmt($id, $where = null)
    {
        $query = 'SELECT * FROM ' . $this->repositoryTable .' WHERE ' . ($where ? $where : 'id = ' . $id);
        try {
            $result = $this->getDb()->query($query);
        } catch (\Exception $e) {
            throw new \Exception('[DB] DB error ' . $e->getMessage() .' in query ' . $query);
        }
        return $result;
    }

    public function fetch($id, $where = null)
    {
        $result = $this->fetchStmt($id, $where);

        return $result->fetch();
    }

    public function exists($id, $where = null)
    {
        $result = $this->fetchStmt($id, $where);

        return $result->rowCount() > 0;

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