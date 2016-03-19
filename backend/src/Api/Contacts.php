<?php

namespace RST\Resq\Api;

use RST\Resq\Domain\Contact;
use RST\Resq\Infrastructure\ContactRepository;

class Contacts extends ApiAbstract {

    protected $userId;

    public function init() {
        $this->userId = $this->requireAuth();
    }

    public function get() {
        // get all user contacts
        $contactsRepository = new ContactRepository(\Flight::db());

        $result = array();
        foreach($contactsRepository->getContactsByUserId($this->userId) as $user) {
            $contactEntity = new Contact();
            $contactEntity->exchangeArray($user);
            $result[] = $contactEntity->getArrayCopy();
        }

        return $result;
    }

    public function put()
    {
        $postData = \Flight::request()->splat;
    }

    public function delete()
    {

    }

}