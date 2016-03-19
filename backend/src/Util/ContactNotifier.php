<?php

namespace RST\Resq\Util;

use RST\Resq\Infrastructure\ContactRepository;

class ContactNotifier {

    public function notify($action) {
        $contactsRepository = new ContactRepository(\Flight::db());

        $contacts = $contactsRepository->getContactsByUserId($action['user_id']);

        $recipients = array();
        foreach($contacts as $contact) {
            $recipients[] = $contact['telephone'];
        }

        SMS::instance()->send($recipients, 'RESQ APP - Your friend may be in trouble! His message: ' . $action['message']);
    }
}