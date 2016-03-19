<?php

namespace RST\Resq\Domain;

abstract class AbstractDomain {

    public function exchangeArray($data)
    {
        foreach($data as $key => $item) {
            if (isset($this->$key)) {
                $this->$key = $item;
            }
        }
    }

    public function getArrayCopy()
    {
        $vars = get_object_vars($this);

        foreach($vars as $var => $value) {
            $result[$var] = $value;
        }

        return $result;
    }

}