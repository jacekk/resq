<?php

namespace RST\Resq\Api;

abstract class ApiAbstract {

    const UNAUTHORIZED = 403;
    const UNPROCESSABLE_ENTITY = 422;
    const GENERAL_ERROR = 500;

    protected $codes = array (
        403 => 'Unauthorized',
        422 => 'Unprocessable Entity',
        500 => 'General error',
    );

    public function init()
    {

    }

    protected function requiredFields($data, $fields)
    {
        foreach($fields as $name) {
            if (!isset($data->$name)) {
                throw new ApiProblem('Field ' . $name . ' is required in this request');
            }
        }
    }

    public function apiProblem($code, $module, $message)
    {
        $response['code'] = $code;
        $response['errorType'] = $this->codes[$code];
        $response['module'] = $module;
        $response['message'] = $message;

        return ($response);
    }

    protected function requireAuth()
    {
        $session = \Flight::get('session');

        $segment = $session->getSegment('Auth');

        if ($segment->get('email')) {
            return $segment->get('id');
        } else {
            throw new ApiProblem('Unauthorized session');
        }
    }

}