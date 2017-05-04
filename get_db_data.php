<?php

	include ("database.php");
	$link = db_connect();

	$gm = $_POST["gameactive"];
	$st = $_POST["status"];
	$ft = $_POST["filter"];

	if($st != '')
		$st = "AND jb_status.id_status IN (".$st.")";

	$query = "SELECT jb.*, jb_user.name, jb_status.status_name 
			FROM jb, jb_user, jb_status 
			WHERE jb_user.user_id = jb.user_id
			AND jb.game = '".$gm."'
			AND jb.status = jb_status.id_status $st $ft";

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