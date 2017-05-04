<?php

	function get_db_data($link, $game)
	{
		$query = "	SELECT jb.*, jb_user.name, jb_status.status_name 
					FROM jb, jb_user, jb_status 
					WHERE jb_user.user_id = jb.user_id 
					AND jb_status.id_status = jb.status
					AND jb.game = '$game'";

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

		return $db_data;
	}

?>