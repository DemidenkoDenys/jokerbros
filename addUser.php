<?php

	include ("database.php");
	$link = db_connect();

	$ps = $_POST["password"];
	$lg = $_POST["login"];
	$nm = $_POST["name"];
	$gl = $_POST["gel"];
	$pc = basename($_POST["pict"]);

	$query = "INSERT INTO jb_user (name, login, password, gel, wins, defs, draws, avatar) VALUES ('$nm', '$lg', '$ps', $gl, 0, 0, 0, 'img/".$pc."')";

	$result = mysqli_query($link, $query);

	if(!$result)
		die(mysqli_error($link));

?>