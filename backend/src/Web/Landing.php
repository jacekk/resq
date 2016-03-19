<?php

namespace RST\Resq\Web;

use RST\Resq\Infrastructure\ActionRepository;

class Landing extends \RST\Resq\Api\ApiAbstract {

    public function get()
    {
        $params = $this->getRequest()->params;
        $hash = $params['module'];

        $actionRepository = new ActionRepository(\Flight::db());
        $actionRepository->getByHash($hash);

        return \Flight::render('rescuelp', array('action' => array('lat' => 24.32, 'lng' => 34.12)));
    }

}

