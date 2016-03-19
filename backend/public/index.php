<?php

use RST\Resq\Util\ClassFactory;

error_reporting(E_ALL);
ini_set('display_errors', true);

require '../vendor/autoload.php';

Flight::register('db', 'PDO', array('mysql:host=localhost;port=3306;dbname=resq_app', 'resq_app', 'softmasters'), function($db) {
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
});

// Initialize the session
$sessionFactory = new \Aura\Session\SessionFactory;
$session = $sessionFactory->newInstance($_COOKIE);

Flight::set('session', $session);

// Match API rest commands to proper files
header('Access-Control-Allow-Origin: *');

Flight::route('POST /rest/@module/*', function ($module) {
    $result = ClassFactory::create($module, 'post');
    Flight::json($result);
});

Flight::route('GET /rest/@module/*', function ($module) {
    $result = ClassFactory::create($module, 'get');
    Flight::json($result);
});

Flight::route('PUT /rest/@module/*', function ($module) {
    $result = ClassFactory::create($module, 'put');
    Flight::json($result);
});

Flight::route('GET /gateway/@module/*', function ($module) {
    $result = ClassFactory::create($module, 'get', ClassFactory::TYPE_GATEWAY);
    Flight::json($result);
})

Flight::route('/', function(){
    echo 'Resq Backend API';
});

Flight::start();