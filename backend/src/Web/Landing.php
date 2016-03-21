<?php

namespace RST\Resq\Web;

use RST\Resq\Infrastructure\ActionRepository;

class Landing extends \RST\Resq\Api\ApiAbstract {

    public function get()
    {
        $params = $this->getRequest()->params;
        $hash = $params['module'];

        $actionRepository = new ActionRepository(\Flight::db());
        $action = $actionRepository->getByHash($hash)->fetch();

        if ($action) {
            return \Flight::render('rescuelp', array('action' => array('lat' => $action['lat'], 'lng' => $action['lng'])));
        } else {
            \Flight::notFound();
        }
    }

}

