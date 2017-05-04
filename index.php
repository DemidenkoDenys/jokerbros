<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="UTF-8">
		<title>Игровой портал - jokerbros</title>

		<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,900italic,900,700italic,600italic,400italic,300italic,300,200italic,200' rel='stylesheet' type='text/css'>

		<link rel="stylesheet" href="css/reset.css">
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/jquery.mCustomScrollbar.css">
		<link rel="shortcut icon" href="icon.ico" type="image/x-icon">

		<!--[if lt IE 9]>
			<script src="jquery-1.9.0.js"></script>
		<![endif]-->

		<script src="js/jquery-1.9.0.js" type="text/javascript"></script>
		<script src="js/jquery.mCustomScrollbar.js"></script>
		<script src="js/main.js" type="text/javascript"></script>
		<script src="js/functions.js" type="text/javascript"></script>

		<!-- [if IE]>
		<script src="html5.js"></script>
		<![endif] -->
	</head>

	<body>
		<header id="menu">
			<a class="logo"><img src="img/logo.png" alt=""></a>

			<a class="menu">Joker</a>
			<a class="menu">Backgammon</a>
			<a class="menu">Bura</a>
			<a class="menu">Domino</a>
			<a class="menu active">Seka</a>
			<a class="menu">Slots</a>

			<a class="account">
				<div>
					<img class="photo auth" src="" alt="">
					<p class="auth">
						<span class="name"></span><br>
						<span class="money"></span> gel
					</p>
				</div>
			</a>

			<p class="players"><span class="online"></span>players online</p>

			<p class="custom auth"><img src="img/custom.png" width="100%" height="100%" alt=""></p>
		</header>
		
		<section id="access">
			<p>Вход</p>
			<div class="login">
				<p><input type="text" id="login" placeholder="LOGIN" value="admin"></p>
			</div>

			<div class="password">
				<p><input type="password" id="password" placeholder="PASSWORD" value="admin"></p>
			</div>

			<div class="repeat">
				<p><input type="password" id="repeat_password" placeholder="REPEAT PASSWORD"></p>
			</div>

			<div class="name-author">
				<p><input type="text" id="name" placeholder="NAME"></p>
			</div>

			<div class="gel">
				<p><input type="text" id="gel" placeholder="1 GEL = 1$"></p>
			</div>

			<div class="foto">
				<a></a>
				<p>
					<form id="loadfile" action="upload.php" method="post" enctype="multipart/form-data">
						<input type="button" id="foto" value="Выберите файл...">
						<input class="filename" type="file" name="filename" accept="image/jpeg,image/png,image/gif">
					</form>
				</p>
			</div>

			<div class="submit">
				<p>	<input type="submit" id="submit" value="ОТПРАВИТЬ">
					<input id="register" type="button" value="РЕГИСТРАЦИЯ"></p>
			</div>
		</section>

		<section id="custom">
			<div class="filter">
				<label for="f_money"><img src="img/f_money.png" alt="Фильтрация по призовому фонду"></label>
				<input id="f_money" class="f_money" type="text" placeholder="stake >">
				<input id="f_money_before" class="f_money" type="text" placeholder="< stake">
			</div>

			<div class="filter">
				<label for="f_coin"><img src="img/f_coin.png" alt="Фильтрация по ставке"></label><br>
				<input id="f_coin" class="f_coin" type="text" placeholder="bet >">
				<input id="f_coin_before" class="f_coin" type="text" placeholder="< bet">
			</div>
			
			<div class="filter">
				<label for="f_place"><img src="img/f_place.png" alt="Фильтрация по раундам"></label>
				<input id="f_place" class="f_place" type="text" placeholder="rounds >">
				<input id="f_place_before" class="f_place" type="text" placeholder="< rounds">
			</div>

			<p class="select">find</p>
		</section>

		<section id="account" class="auth">
			<img class="photo" src="img/photo.jpg" alt=""><br>
			<p class="name">Dexter Manderbrandt</p><br>
			<p><span class="money"></span> gel</p><br><br>
			<ul>
				<li>поб. <span class="wins"></span> / пор. <span class="defs"></span> / нич. <span class="draws"></span></li>
			</ul><br>
			<div class="checks">
				<form>
					<input type="checkbox" name="filter-1" value="1" id="check1"><label for="check1">open</label><br><br>
					<input type="checkbox" name="filter-2" value="3" id="check2"><label for="check2">waiting</label><br><br>
					<input type="checkbox" name="filter-3" value="2" id="check3"><label for="check3">playing</label><br><br>
					<input type="checkbox" name="filter-4" value="4" id="check4"><label for="check4">ended</label><br><br>
				</form>
			</div>

			<a class="new-table auth"><p>New table</p></a>
		</section>

		<section id="table" class="auth">
			<div class="table_container">
				<div class="table">
					<div class="row_caption">
						<div class="caption">user</div>
						<div class="caption">rounds</div>
						<div class="caption">bet</div>
						<div class="caption">status</div>
					</div>
				</div>
			</div>
		</section>

		<div id="message">
			<div>
				<p style="text-align: center; line-height: 40px;">Создать игровой стол</p>
				<input type="number" class="stake" max="10000" min="100" step="10" value="100"><p class="lbl">Ставка</p>
				<input type="number" class="rounds" max="9" min="1" value="3"><p class="lbl">Раундов</p>
				<input type="number" class="player" max="9" min="2" value="2"><p class="lbl">Игроков</p>
				<select name="games" id="games-new-table">
					<option value="joker" selected>joker</option>
					<option value="backgammon">backgammon</option>
					<option value="bura">bura</option>
					<option value="domino">domino</option>
					<option value="seka">seka</option>
					<option value="slots">slots</option>
				</select>
				<p class="lbl">Игра</p>
				<input class="create-table" type="button" value="Создать">
				<input class="close" type="button" value="Отменить">
			</div>
		</div>

		<div id="message-winner"></div>
	</body>
</html>