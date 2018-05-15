<?php
include('db_connection.php');
include('db_functions.php');

// We will get some data from the database; we should already have a database connection

$query = "SELECT * from earthquakes_2016";

if (isset($_GET['magnitude'])) {
	$sev = $_GET['magnitude'];
	// We only need to look for certain values
	switch($sev) {
	case 1:
		$query .= " where magnitude <5 ";
		break;
	case 2:
		$query .= " where magnitude >= 5 and magnitude < 6";
		break;
	case 3:
		$query .= " where magnitude >= 6 and magnitude < 7";
		break;
	case 4:
		$query .= " where magnitude >= 7 and magnitude < 8";
		break;
	case 5:
		$query .= " where magnitude >= 8";
		break;
	default:
	}
}	
if (isset($_GET['selectdate'])) {
	$sev = $_GET['selectdate'] || "3000-01-01";
	// We only need to look for certain values
	$query .= (" where date = '" . $sev . "'");
}
// this captures all the results as an array in PHP...
$results = db_assocArrayAll($dbh,$query);

// ...however, we want a Javascript array, for the rest of the Javascript to use
echo "<script type='text/javascript'>";
echo "var myData = ".json_encode($results,JSON_NUMERIC_CHECK);
echo "</script>";
?>