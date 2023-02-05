<?php

require '../vendor/autoload.php'; // include Composer's autoloader


// Defining variables
$db_host = "localhost";
$db_pass = "";
$db_user = "root";

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, "guvi_internship");
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//Retrieve form data.
$info = $_POST['info'];
$creds = explode(":", base64_decode($info));


// $email = "test22@example.com";
// $passwrd = "Test12@";

// Hashing Password
$email = $creds[0];
$passwrd = sha1((strrev($creds[1])));

$sttmnt = $conn->prepare("SELECT id,email FROM users where email = ? AND passwrd = ? ");
$sttmnt->bind_param("ss", $email, $passwrd);
$sttmnt->execute();

$result = $sttmnt->get_result();

$row = $result->fetch_assoc();
if ($row) {
  try {
    $result = json_encode($row);
    echo $result;
  } catch (Error $e) {
    echo $e;
  }
} else {
  echo "User not found";
}
