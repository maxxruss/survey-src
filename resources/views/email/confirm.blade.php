<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div style="padding: 20px;">
        <h2>Здравствуйте, <?php echo $details['login'] ?></h2>
        <div>Для активации аккаунта и подтверждения почты Вам необходимо пройти по <a href="<?php echo $details['link'] ?>">этой</a> ссылке.</div>
        <div>
            С уважением,<br>
            Survey Services
        </div>
    </div>
</body>

</html>