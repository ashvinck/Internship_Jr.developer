<?php

// Defining variables
  $db_host = "localhost";
  $db_pass = "";
  $db_user = "root";

// Create connection
  $conn = new mysqli($db_host, $db_user, $db_pass,"guvi_internship");

//Retrieve form data.
  $email = $_POST['email'];
  $passwrd = $_POST['passwrd'];

  // $email = "test22@example.com";
  // $passwrd = "Test12@";

// Hashing Password
  $passwrd = sha1($passwrd);
  
  $sttmnt = $conn->prepare("SELECT id FROM users where email = ? AND passwrd = ? ");
  $sttmnt->bind_param("ss",$email,$passwrd);
  $sttmnt->execute();
  
  $result = $sttmnt->get_result();
  
  $row = $result->fetch_assoc();

  $count = $row['id'];

  // echo $count;
  if($count)
  {
  echo "User Found";
  }
  else {
  echo "Invalid Credentials";
  }
    





?>