<?php
// Connect to the database
$servername = "localhost";
$username = "your_db_username";
$password = "your_db_password";
$dbname = "your_db_name";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the username and password from the request
$username = $_POST['username'];
$password = $_POST['password'];

// Prepare and execute the SQL query to check the username and password
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

// Check if the query returned a row (successful login)
if ($result->num_rows === 1) {
    echo "Login successful";
} else {
    echo "Invalid username or password";
}

$stmt->close();
$conn->close();