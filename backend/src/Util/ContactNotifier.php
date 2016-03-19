<?php

namespace RST\Resq\Util;

use RST\Resq\Domain\Action;
use RST\Resq\Infrastructure\ActionRepository;
use RST\Resq\Infrastructure\ContactRepository;

class ContactNotifier {

    public function notify($action) {
        if (!is_array($action)) return;
        $contactsRepository = new ContactRepository(\Flight::db());

        $contacts = $contactsRepository->getContactsByUserId($action['user_id']);

        $recipients = array();
        foreach($contacts as $contact) {
            $recipients[] = $contact['telephone'];
        }

        $shortener = new UrlShortener();

        $repo = new ActionRepository(\Flight::db());
        $url = 'http://api.resq.banasiak.pro/s/' . sha1($action['user_id']. $action['id']. ActionRepository::HASH_CONST);

        $short = $shortener->shorten($url);
        SMS::instance()->send($recipients, 'RESQ APP - Your friend may be in trouble! His message: ' . $action['message'] . ', more: ' . $short);
    }
}