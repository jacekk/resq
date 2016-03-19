<?php

namespace RST\Resq\Api;

use RST\Resq\Infrastructure\ContactRepository;
use RST\Resq\Domain;

class Contact extends ApiAbstract {

    protected $userId;

    public function init() {
        $this->userId = $this->requireAuth();
    }

    /**
     * Get single contact by id
     */
    public function get()
    {
        $contactsRepository = new ContactRepository(\Flight::db());
        $contact = new Contact();

        $id = (int) $this->request->splat;

        $contact->exchangeArray($contactsRepository->fetch($id));

        return $contact;
    }

    public function put()
    {

    }

}