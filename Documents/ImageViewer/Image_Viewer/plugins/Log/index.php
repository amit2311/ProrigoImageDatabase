<?php

/**
 * @author      Tobias Reich
 * @copyright   2015 by Tobias Reich
 * @description This file queries the database for log messages and displays them if present.
 */

namespace Log;

use Mysqli;
use ProrigoGallery\Modules\Database;
use ProrigoGallery\Modules\Settings;

$ProrigoGallery = __DIR__ . '/../../';

require($ProrigoGallery . 'php/define.php');
require($ProrigoGallery . 'php/autoload.php');

// Start the session
session_start();

// Set content
header('content-type: text/plain');

// Load config
if (!file_exists(ProrigoGallery_CONFIG_FILE)) exit('Error 001: Configuration not found. Please install ProrigoGallery first.');
require(ProrigoGallery_CONFIG_FILE);

// Ensure that user is logged in
if ((isset($_SESSION['login'])&&$_SESSION['login']===true)&&
	(isset($_SESSION['identifier'])&&$_SESSION['identifier']===Settings::get()['identifier'])) {

	// Result
	$query  = Database::prepare(Database::get(), "SELECT FROM_UNIXTIME(time), type, function, line, text FROM ?", array(ProrigoGallery_TABLE_LOG));
	$result = Database::get()->query($query);

	// Output
	if ($result->num_rows===0) {

		echo('Everything looks fine, ProrigoGallery has not reported any problems!');

	} else {

		while($row = $result->fetch_row()) {

			// Encode result before printing
			$row = array_map('htmlentities', $row);

			// Format: time TZ - type - function(line) - text
			printf("%s - %s - %s (%s) \t- %s\n", $row[0], $row[1], $row[2], $row[3], $row[4]);

		}

	}

} else {

	// Don't go further if the user is not logged in
	exit('You have to be logged in to see the log.');

}

?>