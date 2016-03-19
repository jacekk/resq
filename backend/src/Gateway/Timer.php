<?php

namespace RST\Resq\Gateway;

use RST\Resq\Domain\Action;
use RST\Resq\Infrastructure\ActionRepository;
use RST\Resq\Infrastructure\ContactRepository;

use SerwerSMS\SerwerSMS;

class Timer extends AbstractGateway {

    public function init()
    {
        $this->sms = new SerwerSMS('webapi_resq', 'softmasters');
    }

    public function get()
    {
        $actionRepository = new ActionRepository(\Flight::db());
        $contactsRepository = new ContactRepository(\Flight::db());

        $actions = $actionRepository->fetch(null,
            'expires > \'' . date('Y-m-d H:i:s') .'\' AND status = ' . Action::STATUS_ACTIVE
        );

        $markActions = array();
        foreach($actions as $action) {
            // Get list of contacts
            $this->log('Get list of contacts for action ' . $action['id']);

            $contacts = $contactsRepository->getContactsByUserId($action['user_id']);

            $recipients = array();
            foreach($contacts as $contact) {
                $recipients[] = $contact['telephone'];
            }

            $result = $this->sms->messages->sendSms(
                $recipients,
                'resqme.com - Your friend may be in trouble! Message: ' . $action['message'],
                '4301',
                array(
                    'test' => false,
                    'details' => true
                )
            );

            $markActions[] = $action['id'];
        }

        $actionRepository->setStatus($markActions, Action::STATUS_WARNED);

        var_dump($markActions);
    }
}