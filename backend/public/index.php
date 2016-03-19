<?php

// Dirty CORS hack... veeery dirty, but Cordova is very restrict about CORS and even * not helps
$headers = getallheaders();
if (isset($headers['Authorization'])) {
    session_id($headers['Authorization']);
    session_start();
}

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

Flight::route('OPTIONS *', function () {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: X-Requested-With');
        header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept, X-Method-Override, X-HTTP-Method, X-HTTP-Method-Override');
        header('Access-Control-Allow-Method: OPTIONS, GET, HEAD, PATCH, POST, PUT, DELETE, LINK, UNLINK');
        die();
});

Flight::route('POST /rest/@module/*', function ($module, $route) {
    $result = ClassFactory::create($module, $route, 'post');
    Flight::json($result);
}, true);

Flight::route('GET /rest/@module/*', function ($module, $route) {
    $result = ClassFactory::create($module, $route, 'get');
    Flight::json($result);
}, true);

Flight::route('PUT /rest/@module/*', function ($module, $route) {
    $result = ClassFactory::create($module, $route, 'put');
    Flight::json($result);
}, true);

Flight::route('DELETE /rest/@module/*', function ($module, $route) {
    $result = ClassFactory::create($module, $route, 'delete');
    Flight::json($result);
}, true);

Flight::route('GET /gateway/@module/*', function ($module, $route) {
    $result = ClassFactory::create($module, $route, 'get', ClassFactory::TYPE_GATEWAY);
    Flight::json($result);
}, true);

Flight::route('GET /s/@hash', function($hash) {

});

Flight::route('/', function(){
    echo 'Resq Backend API';
});

Flight::start();