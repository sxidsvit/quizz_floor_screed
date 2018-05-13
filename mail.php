<?php
	$livingPlace = trim($_GET["livingPlace"]);
	$square  = trim($_GET["square"]);
	$additional = trim($_GET["additional"]);
	$tel = trim($_GET["tel"]);

	$to = "s.p.antonyuk@gmail.com";
	$subject = "Сообщение с сайта http://ad.lekua.in.ua/calc";
	//$message = $livingPlace.'<br>'.$square.'<br> '.$additional.'<br>'.$tel ;

$c = true;
	foreach ( $_GET as $key => $value ) {
	 	$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			"; 
	}

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$site_email = "sergeyh@voliacable.com";
$project_name = "Калькулятор скидки";

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$site_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($to, adopt($subject), $message, $headers );
