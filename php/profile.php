<?php

// require 'vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");

$userdb = $client-> userdb;

$result1 = $userdb-> createCollection("users");
var_dump($result1);


?>