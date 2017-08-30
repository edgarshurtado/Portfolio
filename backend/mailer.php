<?php
$to = "edsanhu@gmail.com"; // this is your Email address
$from = $_POST['email']; // this is the sender's Email address
$serverMail = 'system@edgarsh.es';
$name = $_POST['name'];
$rawMessage = $_POST['message'];

$subject = "Form submission";
$subject2 = "Copy of your form submission";

$message = "$name \n\n $rawMessage";
$message2 = "Here is a copy of your message: \n\n" . $message;

$header = "From: $serverMail";

mail($to,$subject,$message,$header);
mail($from,$subject2,$message2,$header); // sends a copy of the message to the sender
echo "Thank you for your message";
header('refresh:2;url=http://edgarsh.es/projects/portfolio-demo');

