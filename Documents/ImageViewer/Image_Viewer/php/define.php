<?php

// Define root
define('ProrigoGallery', substr(__DIR__, 0, -3));

// Define status
define('ProrigoGallery_STATUS_NOCONFIG', 0);
define('ProrigoGallery_STATUS_LOGGEDOUT', 1);
define('ProrigoGallery_STATUS_LOGGEDIN', 2);

// Define dirs
define('ProrigoGallery_DATA', ProrigoGallery . 'data/');
define('ProrigoGallery_SRC', ProrigoGallery . 'src/');
define('ProrigoGallery_UPLOADS', ProrigoGallery . 'uploads/');
define('ProrigoGallery_UPLOADS_BIG', ProrigoGallery_UPLOADS . 'big/');
define('ProrigoGallery_UPLOADS_MEDIUM', ProrigoGallery_UPLOADS . 'medium/');
define('ProrigoGallery_UPLOADS_THUMB', ProrigoGallery_UPLOADS . 'thumb/');
define('ProrigoGallery_UPLOADS_IMPORT', ProrigoGallery_UPLOADS . 'import/');
define('ProrigoGallery_PLUGINS', ProrigoGallery . 'plugins/');

// Define files
define('ProrigoGallery_CONFIG_FILE', ProrigoGallery_DATA . 'config.php');

// Define urls
define('ProrigoGallery_URL_UPLOADS_BIG', 'uploads/big/');
define('ProrigoGallery_URL_UPLOADS_MEDIUM', 'uploads/medium/');
define('ProrigoGallery_URL_UPLOADS_THUMB', 'uploads/thumb/');

function defineTablePrefix($dbTablePrefix) {

	// This part is wrapped into a function, because it needs to be called
	// after the config-file has been loaded. Other defines are available
	// before the config-file has been loaded.

	// Parse table prefix
	// Old users do not have the table prefix stored in their config-file
	if (isset($dbTablePrefix)===false) $dbTablePrefix = '';
	if ($dbTablePrefix!=='') $dbTablePrefix .= '_';

	// Define tables
	define('ProrigoGallery_TABLE_ALBUMS', $dbTablePrefix . 'ProrigoGallery_albums');
	define('ProrigoGallery_TABLE_LOG', $dbTablePrefix . 'ProrigoGallery_log');
	define('ProrigoGallery_TABLE_PHOTOS', $dbTablePrefix . 'ProrigoGallery_photos');
	define('ProrigoGallery_TABLE_SETTINGS', $dbTablePrefix . 'ProrigoGallery_settings');

}

?>