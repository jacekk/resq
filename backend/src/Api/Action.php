<?php

namespace RST\Resq\Api;

use RST\Resq\Domain\Action as ActionDomain;
use RST\Resq\Infrastructure\ActionRepository;

class Action extends ApiAbstract {

    protected $userId;
    protected $repository = new ActionRepository(\Flight::db());

    public function init()
    {
        // Ensure that we're authorized
        $this->userId = $this->requireAuth();
    }

    public function post()
    {
        $action = new ActionDomain();
        $postData = \Flight::request()->data;

        try {
            $this->requiredFields($postData, array('message', 'expires'));
        } catch (ApiProblem $e) {
            return $this->apiProblem(self::UNPROCESSABLE_ENTITY, 'ActionPost', $e->getMessage());
        }

        $action->setMessage($postData->message);
        $action->setExpiresByTime($postData->expires);
        $action->setLat($postData->lat);
        $action->setLng($postData->lng);
        $action->setUserId($this->userId);
        $action->setCreated();
        $action->setStatus(ActionDomain::STATUS_ACTIVE);

        $action = $this->getRepository()->persist($action);

        return $action->getArrayCopy();
    }

    public function put()
    {
        $action = new ActionDomain();

    }

    protected function getRepository()
    {
        return $this->repository;
    }
}