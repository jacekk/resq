<?php

namespace RST\Resq\Api;

abstract class ApiAbstract {

    protected $request;

    const UNAUTHORIZED = 403;
    const UNPROCESSABLE_ENTITY = 422;
    const GENERAL_ERROR = 500;

    protected $codes = array (
        403 => 'Unauthorized',
        422 => 'Unprocessable Entity',
        500 => 'General error',
    );

    public function init($request)
    {
        $this->request = $request;
    }

    protected function getRequest()
    {
        return $this->request;
    }

    protected function setStatus($code)
    {
        \Flight::response()->status($code);
    }

    protected function getRequestEntityId()
    {
        return (int) $this->request->splat;
    }

    protected function requiredFields($data, $fields)
    {
        foreach($fields as $name) {
            if (!isset($data->$name)) {
                throw new ApiProblem('Field ' . $name . ' is required in this request');
            }
        }
    }

    public function apiProblem($code, $module, $message, $additionalValues = array())
    {
        \Flight::response()->status($code);
        $response['code'] = $code;
        $response['errorType'] = $this->codes[$code];
        $response['module'] = $module;
        $response['message'] = $message;
        \Flight::response()->header('Content-type', 'application/json');
        \Flight::response()->write(json_encode(array_merge($response, $additionalValues)));
        \Flight::response()->sendHeaders();
        \Flight::response()->send();
        \Flight::stop();
        return array_merge($response, $additionalValues);
    }

    public function apiSuccess($code, $message, $additionalValues = array())
    {
        \Flight::response()->status($code);
        $response['code'] = $code;
        $response['message'] = $message;
        \Flight::response()->header('Content-type', 'application/json');
        \Flight::response()->write(json_encode(array_merge($response, $additionalValues)));
        \Flight::response()->sendHeaders();
        \Flight::response()->send();
        \Flight::stop();
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