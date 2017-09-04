<?php

$sanitizeOptions = array(
    'email' => FILTER_SANITIZE_EMAIL,
    'name' =>  FILTER_SANITIZE_STRING,
    'message' =>  FILTER_SANITIZE_STRING
);

$sanitizedPostData = filter_var_array($_POST, $sanitizeOptions);

$to = "edsanhu@gmail.com";
$from = $sanitizedPostData['email'];
$serverMail = 'system@edgarsh.es';
$name = $sanitizedPostData['name'];
$rawMessage = $sanitizedPostData['message'];

$subject = "Form submission";
$subject2 = "Copy of your form submission";

$message = "$name \n\n $rawMessage";
$message2 = "Here is a copy of your message: \n\n" . $message;

$header = "From: $serverMail";

mail($to,$subject,$message,$header);
mail($from,$subject2,$message2,$header); // sends a copy of the message to the sender

echo "Thank you for your message";
header('refresh:2;url=http://edgarsh.es/projects/portfolio-demo');

