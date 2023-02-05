
<?php
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

// Posting Data from form to DB
$fullname = $_POST['fullname'];
$dob = $_POST['dob'];
$age = $_POST['age'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$work = $_POST['work'];

$userpost = array(
    "name" => $fullname,
    "dob" => $dob,
    "age" => $age,
    "phone" => $phone,
    "address" => $address,
    "work" => $work
);

if ($collection->insertOne($userpost)) {
    echo "User Data inserted successfully";
} else {
    echo "Error occured when posting data";
}
