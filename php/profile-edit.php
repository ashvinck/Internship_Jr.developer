
<?php

session_start();  // Redis Session
require '../vendor/autoload.php'; // include Composer's autoloader


// Declaring Mongo url
$db_url = "mongodb://localhost:27017";

// Connecting to MongoDB 
$client = new MongoDB\Client($db_url);

// Checking the status of connection request
if (!$client) {
    echo "Unable to connect to Database";
}

// Selecting the database
$db_name = $client->guviInternship;
if (!$db_name) {
    echo "Error in creating database guviInternship";
}

// Selecting or creating a collection if it doesn't exist
$collection  = $db_name->userData;
if (!$collection) {
    echo "Error in creating collection userData";
}

// Updating Data from form
$fullname = $_POST['fullname'];
$age = $_POST['age'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$work = $_POST['work'];

$userupdate = array(
    '$set' => array(
        "name" => $fullname,
        "age" => $age,
        "phone" => $phone,
        "address" => $address,
        "work" => $work
    )
);

$email = $_POST['email'];

$condition = array("email" => $email);

if ($collection->updateOne($condition, $userupdate)) {
    echo "Record Updated Successfully";
} else {
    echo "User not found";
}
