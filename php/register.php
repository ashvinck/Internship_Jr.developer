<?php 
  
  // Declaring Variables
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

  // Create database if it does not exist
$sql = "CREATE DATABASE IF NOT EXISTS guvi_internship";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

// mysqli_close($conn);
$conn->close();


$conn = new mysqli($db_host, $db_user,$db_pass,"guvi_internship");

if(!$conn->query("SHOW TABLES LIKE 'users'")->num_rows)
{
  $sql = "CREATE TABLE users(
    id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    passwrd VARCHAR(300) NOT NULL
  )";

  if($conn->query($sql)===TRUE)
  {
    echo "Table created succesfully";
  }
  else {
    echo "Error:".$conn->error;
  }

}

$sttmnt = $conn->prepare("INSERT INTO users(email,passwrd) values(?,?)");
$sttmnt->bind_param("ss",$email,$passwrd);

// getting from POST request
$email = $_POST['email'];
$passwrd = $_POST['passwrd'];

// Hashing Password
$passwrd = sha1($passwrd);

$sttmnt->execute();

// $sttmnt->close();
// $conn->close();
//echo $conn->error;

?>
