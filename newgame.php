<?php
	include ("database.php");

	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	// номер игры
	$id_game = 41;
	// получение данных об игре
	$game = get_data("SELECT * FROM jb WHERE id = $id_game");

	// id игрока, который на сайте
	$user_current = 'Jamal';
	// получение id игрока создателя игры
	$user_creator = $game[0]['user_id'];

	$users = array();
	$users2 = array();

	// заносим данные о текущем игроке и создателе в массив (они в игре ватоматически)
	$users[] = array_shift(get_data("SELECT * FROM jb_user WHERE login = '".$user_current."'"));
	$users[] = array_shift(get_data("SELECT * FROM jb_user WHERE user_id = $user_creator"));

	// заносим данные об остальных игроках кроме текущего и создателя
	$user_count = get_data("SELECT * FROM jb_user WHERE user_id NOT IN ('".$users[0]['user_id']."', $user_creator)");

	//=========== случайный выбор игроков ============//
	for($i = 0; $i < $game[0]['players'] - 2; $i++)
	{
		$random = mt_rand(0, count($user_count) - 1);	// выбираем игрока для игры случайно
		$users[] = $user_count[$random];				// добавляем претендента в игру
		array_splice($user_count, $random, 1);			// удаляем занесенног игрока из списка претендентов
	}
	shuffle($users);	// перемешиваем порядок игроков в массиве

	//======= снятие ставки со счета каждого =========//
	for($i = 0; $i < count($users); $i++)
	{
		$b = $users[$i]['gel'] - $game[0]['bet'];
		$u = $users[$i]['user_id'];
		$d = $users[$i]['defs'] + 1;
		set_data("UPDATE jb_user SET gel = $b, defs = $d WHERE user_id = $u");
	}

	//=================== начало игры ================//
	$winner = $users[mt_rand(0, count($users) - 1)];	// определение победителя

		$d = $winner['defs'];
		$w = $winner['wins'] + 1;
		$g = $winner['gel'] + $game[0]['bet'] * $game[0]['players'];
		$u = $winner['user_id'];
	set_data("UPDATE jb_user SET gel = $g, defs = $d, wins = $w WHERE user_id = $u");

	set_data("DELETE FROM jb WHERE id = $id_game");

	echo $users[] = $winner['name']."<br>";
	$users2 = array_shift(get_data("SELECT * FROM jb_user WHERE login = '".$user_current."'"));
	echo $users[] = $users2['gel']."<br>";
	echo $users[] = $users2['wins']."<br>";
	echo $users[] = $users2['defs']."<br>";
	echo $users[] = $users2['name']."<br>";
	echo $users[] = $users2['draws']."<br>";










	//=================== ФУНКЦИИ ====================//
	function get_data($sql)
	{
		$link = db_connect();
		$db_data = array();

		$result = mysqli_query($link, $sql);

		if(!$result) die(mysqli_error($link));
		$n = mysqli_num_rows($result);

		for($i = 0; $i < $n; $i++)
			$db_data[] = mysqli_fetch_assoc($result);

		return $db_data;
	}

	function set_data($sql)
	{
		$link = db_connect();
		mysqli_query($link, $sql);
	}
?>