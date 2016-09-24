<?php

spl_autoload_register(function($class) {

	$classPath = str_replace('ProrigoGallery\\', '', $class);
	$classPath = str_replace('\\', DIRECTORY_SEPARATOR, $classPath);

	$file = ProrigoGallery . 'php/' . $classPath . '.php';

	if (file_exists($file)===true) require $file;

});

spl_autoload_register(function($class) {

	$classPath = str_replace('\\', DIRECTORY_SEPARATOR, $class);

	$file = ProrigoGallery . 'plugins/' . $classPath . '.php';

	if (file_exists($file)===true) require $file;

});

?>