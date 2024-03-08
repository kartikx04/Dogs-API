<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dogs_db";

// Create a new MySQLi instance
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the JSON request body
$requestBody = file_get_contents('php://input');

// Decode the JSON request body
$data = json_decode($requestBody, true);

// Retrieve the username and password from the request body
$username = $data['username'];
$password = $data['password'];

// Prepare and execute the SQL query to check the username and password
$stmt = $conn->prepare("SELECT id FROM credentials WHERE username = ? AND password = ?");
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