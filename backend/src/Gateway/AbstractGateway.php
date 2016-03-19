<?php
namespace RST\Resq\Gateway;

use RST\Resq\Api\ApiAbstract;

abstract class AbstractGateway extends ApiAbstract
{
    protected $debug = true;

    public function init()
    {

    }

    public function log($message)
    {
        if ($this->debug) {
            echo $message . '<br/>';
        }
    }

}