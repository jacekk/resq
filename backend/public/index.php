<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
session_start();
require '../vendor/autoload.php';

Flight::register('db', 'PDO', array('mysql:host=localhost;port=3306;dbname=resq_app', 'resq_app', 'softmasters'), function($db) {
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
});

// Initialize the session
$sessionFactory = new \Aura\Session\SessionFactory;
$session = $sessionFactory->newInstance($_COOKIE);

Flight::set('session', $session);

// Match API rest commands to proper files

Flight::route('/rest/@module/*', function ($module) {
    $className = '\\RST\\Resq\\Api\\' . ucfirst($module);

    if (class_exists($className)) {
        $class = new $className;
        try {
            $result = $class->handle();
        } catch (\Exception $e) {
            $result = $class->apiProblem(500, 'Router', 'Error: ' . $e->getMessage());
        }

        Flight::json($result);
    }
});

Flight::route('/', function(){
    echo 'Resq Backend API';
});

Flight::start();