<?php

/*
|--------------------------------------------------------------------------
| Application Error Settings
| On/Off PHP Errors
|--------------------------------------------------------------------------
|
|  Comment Description
|
 */

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

/*
|--------------------------------------------------------------------------
| Define project base path
| Project base path
|--------------------------------------------------------------------------
|
|  Comment Description
|
 */

define('ABSPATH', dirname(dirname(__FILE__)) . '/');

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
require_once ABSPATH . 'includes/Instagram.php';
// load helper file
require_once ABSPATH . 'includes/Helper.php';

// pre($_REQUEST);die;

// create Instagram class object
$instagram = new InstagramWrapper();

// get action request
if (isset($_REQUEST['request_action'])) {
    extract($_REQUEST);
} else {
    $request_action = 'pull_hashtag';
}

// condition for account info
if ($request_action == 'pull_account') {
    // echo output
    echo $instagram->insta_account();
}
// condition for hash tag search 
else {
    echo $instagram->insta_search();
}

/**
 * Debug JSON Data Test
 * @var [type]
 */
# $json = file_get_contents('data.json');
# header('Content-Type: application/javascript');
# echo $json;
