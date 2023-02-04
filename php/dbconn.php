<?php 

// Defining variables
  $db_host = "localhost";
  $db_pass = "";
  $db_user = "root";
 
  // Create connection
  $conn = new mysqli($db_host, $db_user, $db_pass);
  // var_dump($conn);

 // Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
  
?>