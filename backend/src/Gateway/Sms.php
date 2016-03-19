<?php

namespace RST\Resq\Gateway;

use RST\Resq\Domain\Action;
use RST\Resq\Infrastructure\ActionRepository;

use SerwerSMS\SerwerSMS;

class Sms extends AbstractGateway {

    public function init()
    {
        $this->sms = new SerwerSMS('webapi_resq', 'softmasters');
    }

    public function get()
    {
        $actionRepository = new ActionRepository(\Flight::db());

        $phoneNumber = \Flight::request()->query->from;

        $actions = $actionRepository->getActionsByPhone($phoneNumber);
        
        if ($actions->rowCount() > 0) {

            $markActions = array();
            foreach($actions as $action) {
                $markActions[] = $action['id'];
            }

            $actionRepository->setStatus($markActions, Action::STATUS_DISABLED);

            $result = $this->sms->messages->sendSms(
                array($action['telephone']),
                'resqme.com - Your Alarms has been deactivated. Keep safe!',
                '4301',
                array(
                    'test' => false,
                    'details' => true
                )
            );
        } else {
            $result = $this->sms->messages->sendSms(
                array($phoneNumber),
                'resqme.com - You have no active alarms set.',
                '4301',
                array(
                    'test' => false,
                    'details' => true
                )
            );
        }
    }
}