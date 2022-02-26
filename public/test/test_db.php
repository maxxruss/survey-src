<?php

# nc 10.222.0.85 -p 1433
//dblib:host=10.222.0.85:1433;dbname=ost=10.222.0.85;dbname=MasterCatalog;charset=utf8
#$dsn = 'sqlsrv:server=dcdb16.GUO.local;MultipleActiveResultSets=false';
$connection  = pg_connect('host=survey-service-postgres port=5432 dbname=survey user=survey password=}mozxn9~2L');
if($connection) {
    echo 'connected';
} else {
    echo 'there has been an error connecting';
}

//$res = $db->query("SELECT convert(DATE, voting_from_date) FROM meeting WHERE ID=4");

//$res = $db->query("SELECT CONVERT(VARCHAR(10),GETDATE(),110)");
//
//echo '<pre>';
//var_dump($res->fetch());
//
//$res = $db->query("select SYSDATETIMEOFFSET()");
//
//echo '<pre>';
//var_dump($res->fetch());


//$stmt = $db->query("SELECT * FROM meeting WHERE ID=4");
//while ($row = $stmt->fetch()) {
//	echo '<pre>';
//	print_r(convertDate($row["voting_from_date"]));
//}
//var_dump(rand(0, 100));
//
//function convertDate($time) {
//
//	$arMonth = [
//		"Jan" => 1,
//		"Feb" => 2,
//		"Mar" => 3,
//		"Apr" => 4,
//		"May" => 5,
//		"Jun" => 6,
//		"Jul" => 7,
//		"Aug" => 8,
//		"Sep" => 9,
//		"Oct" => 10,
//		"Nov" => 11,
//		"Dec" => 12,
//	];
//
//	if (preg_match("/^([a-zA-Z]{1,5}) ([\d]{2,2}) ([\d]{4,4})/i", $time, $res)) {
//		$month = $arMonth[$res[1]];
//		$day = $res[2];
//		$year= $res[3];
//		return date("d.m.y", mktime(0, 0, 0, $month, $day, $year));
//	}
//	return $time;
//}
