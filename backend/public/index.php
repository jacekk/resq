<?php

require '../vendor/autoload.php';

Flight::route('/', function(){
    echo 'Resq Backend API';
});

Flight::start();