<?php

namespace RST\Resq\Gateway;

use RST\Resq\Domain\Action;
use RST\Resq\Infrastructure\ActionRepository;

use RST\Resq\Util\SMS as SMSProvider;

class Sms extends AbstractGateway {

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

            SMSProvider::instance()->send($action['telephone'], 'resqme.com - Your alarms has been deactivated. Keep safe!');
        } else {
            SMSProvider::instance()->send($phoneNumber, 'resqme.com - You have no active alarms');
        }
    }
}