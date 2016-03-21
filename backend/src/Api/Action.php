<?php

namespace RST\Resq\Api;

use RST\Resq\Domain\Action as ActionDomain;
use RST\Resq\Infrastructure\ActionRepository;
use RST\Resq\Infrastructure\UserRepository;
use RST\Resq\Util\ContactNotifier;
use RST\Resq\Util\SMS;

class Action extends ApiAbstract {

    protected $userId;
    protected $repository;

    public function init()
    {
        // Ensure that we're authorized
        $this->userId = $this->requireAuth();
        $this->repository = new ActionRepository(\Flight::db());
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
        $postData = \Flight::request()->data;
        try {
            $this->requiredFields($postData, array('message'));
        } catch (ApiProblem $e) {
            return $this->apiProblem(self::UNPROCESSABLE_ENTITY, 'ActionPost', $e->getMessage());
        }
        /*
        if ($postData->type == 'rescue') {
            return $this->rescue();
        } else if ($postData->type == 'ok') {
            return $this->safe();
        } else {
            return $this->apiSuccess(200, 'Location & message updated');
        }
        */


    }

    protected function rescue()
    {
        $action = new ActionDomain();
        $postData = \Flight::request()->data;

        $action->exchangeArray($postData);

        $actions = $this->getRepository()->getOpenActions($this->userId);
        $userRepository = new UserRepository(\Flight::db());

        if (!$actions->rowCount()) {
            return $this->apiProblem(404, 'Actions', 'No actions related to user!');
        }

        $markActions = array();
        foreach ($actions as $action) {
            $markActions[] = $action['id'];
        }

        if (!count($actions)) {
            return $this->apiProblem(404, 'Actions', 'No actions related to user!');
        }

        // Notify friends
        $notifier = new ContactNotifier();
        $notifier->notify($action);

        // Mark actions as "need rescue"
        $this->getRepository()->setStatus($markActions, ActionDomain::STATUS_RESCUE);

        // Send back message that system will take care of this
        $rescuedUser = $userRepository->fetchEntity($action['user_id']);
        SMS::instance()->send($rescuedUser->getTelephone(), 'RESQ - Your ICE contact list was notified about your problems! Hope they get there soon!');

        $markActions = array();
        foreach($actions as $action) {
            $markActions[] = $action['id'];
            $notifier->notify($action);
        }
        return $this->apiSuccess(200, 'Notifications about the danger sent!');
    }

    public function safe()
    {
        $actions = $this->getRepository()->getOpenActions($this->userId);
        $userRepository = new UserRepository(\Flight::db());

        if (!$actions->rowCount()) {
            return $this->apiProblem(404, 'Actions', 'No actions related to user!');
        }

        $markActions = array();
        foreach ($actions as $action) {
            $markActions[] = $action['id'];
        }

        // Mark actions as "need rescue"
        $this->getRepository()->setStatus($markActions, ActionDomain::STATUS_DISABLED);

        // Send back message that system will take care of this
        $rescuedUser = $userRepository->fetchEntity($action['user_id']);
        SMS::instance()->send($rescuedUser->getTelephone(), 'RESQ - We\'re glad that you are safe now! Your alarms has been cancelled!');

        $markActions = array();
        foreach($actions as $action) {
            $markActions[] = $action['id'];
        }

        return $this->apiSuccess(200, 'Alarm has been disabled');
    }

    protected function getRepository()
    {
        return $this->repository;
    }
}