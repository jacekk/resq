<?php

namespace RST\Resq\Util;

class ClassFactory {

    public static function create($name, $method)
    {
        $className = '\\RST\\Resq\\Api\\' . ucfirst($name);

        if (class_exists($className)) {
            $class = new $className;
            try {
                $class->init();
                $result = $class->$method();
            } catch (\Exception $e) {
                $result = $class->apiProblem(500, 'Router', 'Error: ' . $e->getMessage());
            }
        } else {
            throw new \Exception('API module does not exist!');
        }

        return $result;
    }
}