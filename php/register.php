<?php
// In this file email and password are retrieved from the registration form
// and the user details are stored in the MYSQL database
// and the user email is again stored in the MongoDB for further processing .


require '../vendor/autoload.php'; // include Composer's autoloader


////////////////// || MYSQL || /////////////
// Declaring Variables
$db_host = "localhost";
$db_pass = "";
$db_user = "root";

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass);
// var_dump($conn);

// Check connection
if ($conn->connect_error) {
  echo "Connection Error: " . $conn->connect_error;
  die("Connection failed: " . $conn->connect_error);
}

// Create database if it does not exist
$sql = "CREATE DATABASE IF NOT EXISTS guvi_internship";
if ($conn->query($sql) === FALSE) {
  echo "Error creating database: " . $conn->error;
}

// mysqli_close($conn);
$conn->close();


$conn = new mysqli($db_host, $db_user, $db_pass, "guvi_internship");

if (!$conn->query("SHOW TABLES LIKE 'users'")->num_rows) {
  $sql = "CREATE TABLE users(
    id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    passwrd VARCHAR(300) NOT NULL
  )";

  if ($conn->query($sql) === FALSE) {
    echo "Error:" . $conn->error;
  }
}

// getting from POST request
$email = $_POST['email'];
$passwrd = $_POST['passwrd'];


// To check if users already exists in the database;
$stmt = $conn->prepare('SELECT 1 FROM users WHERE email=?');
$stmt->bind_param('s', $email);
$stmt->execute();
$exists = (bool) $stmt->get_result()->fetch_row(); // Get the first row from result and cast to boolean

if ($exists) {
  echo "User already exists";
} else {
  $sttmnt = $conn->prepare("INSERT INTO users(email,passwrd) values(?,?)");
  $sttmnt->bind_param("ss", $email, $passwrd);


  // Hashing Password
  $passwrd = sha1($passwrd);
  $sttmnt->execute();
  // var_dump($sttmnt);



  // /////////// || MongoDB || /////////
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

  $userpost = array(
    "email" => $email,
    "name" => "John Doe",
    "age" => "24",
    "phone" => "(239) 816-9029",
    "address" => "Bay Area, San Francisco, CA, USA",
    "work" => "Developer"
  );

  if ($collection->insertOne($userpost)) {
    echo "User Data inserted successfully";
  } else {
    echo "Error occured when posting data";
  }
}
