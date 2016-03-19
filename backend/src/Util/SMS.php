<?php

namespace RST\Resq\Util;

use SerwerSMS\SerwerSMS;

class SMS {

    private static $instance;
    private $smsProvider;

    public static function instance()
    {
        if (!self::$instance) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public function __construct()
    {
        $this->smsProvider = new SerwerSMS('webapi_resq', 'softmasters');
    }

    public function send($recipients, $message)
    {
        $this->smsProvider->messages->sendSms(
            (is_array($recipients) ? $recipients : array($recipients)),
            $message,
            '4301',
            array(
                'test' => false,
                'details' => true
            )
        );
    }

}