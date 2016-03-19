<?php

namespace RST\Resq\Gateway;

use RST\Resq\Domain\Action;
use RST\Resq\Infrastructure\ActionRepository;
use RST\Resq\Infrastructure\ContactRepository;

use RST\Resq\Util\ContactNotifier;

class Timer extends AbstractGateway {

    public function get()
    {
        $actionRepository = new ActionRepository(\Flight::db());
        $contactsRepository = new ContactRepository(\Flight::db());

        $actions = $actionRepository->fetch(null,
            'expires > \'' . date('Y-m-d H:i:s') .'\' AND status = ' . Action::STATUS_ACTIVE
        );

        $notifier = new ContactNotifier();

        $markActions = array();
        foreach($actions as $action) {
            $markActions[] = $action['id'];
            $notifier->notify($action);
        }

        $actionRepository->setStatus($markActions, Action::STATUS_WARNED);
        return $this->apiSuccess(200, 'Notifications sent!');
    }
}