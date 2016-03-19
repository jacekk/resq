<?php

namespace RST\Resq\Api;

use RST\Resq\Infrastructure\ContactRepository;
use RST\Resq\Domain\Contact as ContactDomain;

class Contact extends ApiAbstract {

    protected $userId;
    protected $repository;

    public function init($route) {
        $this->userId = $this->requireAuth();
        $this->repository = new ContactRepository(\Flight::db());
        parent::init($route);
    }

    /**
     * Get single contact by id
     */
    public function get()
    {
        $contact = new ContactDomain();

        $contact->exchangeArray($this->getRepository()->fetch($this->getRequestEntityId()));

        if ($contact->getUserId() != $this->userId) {
            return $this->apiProblem(403, 'Contact', 'Unauthorized fetch');
        }

        return $contact->getArrayCopy();
    }

    public function post()
    {
        $this->getRepository();
        $contact = new ContactDomain();

        $postData = \Flight::request()->data;

        try {
            $this->requiredFields($postData, array('name', 'telephone'));
        } catch (ApiProblem $e) {
            return $this->apiProblem(self::UNPROCESSABLE_ENTITY, 'Contact', $e->getMessage());
        }

        $contact->setUserId($this->userId);
        $contact->setTelephone($postData->telephone);
        $contact->setName($postData->name);

        $contact = $this->getRepository()->persist($contact);
        return $contact->getArrayCopy();
    }

    public function delete()
    {
        $contactData = $this->getRepository()->fetch($this->getRequestEntityId());

        $contact = new ContactDomain();
        $contact->exchangeArray($contactData);

        if ($contact->getUserId() != $this->userId) {
            return $this->apiProblem(403, 'Contact', 'Unauthorized deletion');
        } else {
            $this->getRepository()->delete($contact);
            return $this->apiSuccess(200, 'Removed successfully');
        }
    }

    public function put()
    {

    }
    
    protected function getRepository()
    {
        return $this->repository;
    }

}