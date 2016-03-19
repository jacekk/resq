<?php

namespace RST\Resq\Util;

class ClassFactory {

    const TYPE_API = 'Api';
    const TYPE_GATEWAY = 'Gateway';
    const TYPE_WEB = 'Web';

    public static function create($name, $route, $method, $classType = self::TYPE_API)
    {
        $className = '\\RST\\Resq\\' . $classType . '\\' . ucfirst($name);

        if (class_exists($className)) {
            $class = new $className;
            try {
                $class->init($route);
                $result = $class->$method();
            } catch (\Exception $e) {
                $result = $class->apiProblem(500, 'Router', 'Error: ' . $e->getMessage());
            }
        } else {
            throw new \Exception($classType . ' module does not exist!');
        }

        return $result;
    }
}