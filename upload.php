<?php

	copy($_FILES['filename']['tmp_name'], "img/".$_FILES['filename']['name']);

	header("location: index.php");
	exit();

?>