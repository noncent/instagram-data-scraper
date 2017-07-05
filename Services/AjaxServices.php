<?php

/*
|--------------------------------------------------------------------------
| Get all AjaxPOST request here.. for Non Htaccess Support Server or Not Enable
| MODE Re Write Module Apache
|--------------------------------------------------------------------------
|
|  Comment Description
|
*/

// load Instagram class file
require_once '../Controller/Instagram.php';
// load helper file
require_once '../Helpers/Helper.php';

// create Instagram class object
$instagram = new Instagram();

// echo output
echo $instagram->fetch_data();