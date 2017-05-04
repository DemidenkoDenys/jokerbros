<?php

	include ("database.php");
	$link = db_connect();

	$ps = $_POST["password"];
	$lg = $_POST["login"];

	$query = "SELECT * FROM jb_user WHERE login = '$lg' AND password = '$ps'";

	$result = mysqli_query($link, $query);

	if(!$result)
		die(mysqli_error($link));

	$n = mysqli_num_rows($result);

	$db_data = array();

	for($i = 0; $i < $n; $i++)
	{
		$row = mysqli_fetch_assoc($result);
		$db_data[] = $row;
	}

	echo json_encode($db_data);

?>