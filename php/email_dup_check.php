<?php

include "./dbconn.php";  //db connection file

// Establishing connection to database

$conn = new mysqli($db_host, $db_user,$db_pass,"guvi_internship");

//Retrieve form data.
$email = $_POST['email'];
// $email = "test@example.com";


$sql = "SELECT COUNT(*) as emails FROM users WHERE email = '$email'";

$result = $conn->query($sql);

$row = $result->fetch_assoc();

$count = $row['emails'];

echo $count;
?>