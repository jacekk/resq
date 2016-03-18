<?php

require '../vendor/autoload.php';

Flight::register('db', 'PDO', array('mysql:host=localhost;port=3306;dbname=resq_app', 'resq_app', 'softmasters'), function($db) {
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
});

Flight::route('/', function(){
    echo 'Resq Backend API';
});

Flight::route('/mysqltest', function() {

    echo "<h1>Database test</h1>";
    $conn = Flight::db();
    $data = $conn->query("SELECT * FROM users");

    foreach($data as $row) {
        print_r(json_encode($row));
    }
});

Flight::start();