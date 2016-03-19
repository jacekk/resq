<?php

namespace RST\Resq\Domain;

abstract class AbstractDomain {

    public function exchangeArray($data)
    {
        if (is_array($data)) {
            foreach ($data as $key => $item) {
                if (property_exists($this, $key)) {
                    $this->$key = $item;
                }
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