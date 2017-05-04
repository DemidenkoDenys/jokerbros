<?php
	include ("database.php");

	$game = $_POST["gam"];
	$rounds = $_POST["round"];
	$players = $_POST["player"];
	$bet = $_POST["stake"];
	$login = $_POST["log"];

	$current_user = array_shift(get_data("SELECT * FROM jb_user WHERE login = '".$login."'"));
	$id = $current_user['user_id'];

	set_data("INSERT INTO jb (user_id, bet, game, rounds, players, status) VALUES ($id, $bet, '".$game."', $rounds, $players, 1)");

	echo json_encode($id);

	function set_data($sql)
	{
		$link = db_connect();
		mysqli_query($link, $sql);
	}

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

?>