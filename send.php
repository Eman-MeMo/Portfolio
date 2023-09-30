<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    require './PHPMailer/src/Exception.php';
    require './PHPMailer/src/PHPMailer.php';
    require './PHPMailer/src/SMTP.php';
    
    $mail = new PHPMailer(true);
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["msg"];
    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'emantestmailer@gmail.com'; // Your Gmail email address
        $mail->Password = 'aoiytubomxznewcp';      // Your Gmail password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
    
        // Recipients
        $mail->setFrom('emantestmailer@gmail.com', 'Eman');
        $mail->addAddress($email); // Add recipient's email address
    
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;
        
        $mail->send();
        echo"<script> console.log('Message has been sent')</script>";
    } catch (Exception $e) {
        echo "<script> console.log('Message could not be sent. Mailer Error: {$mail->ErrorInfo}')</script>";
    }
    include('index.html');
?>