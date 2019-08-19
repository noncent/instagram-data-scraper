<?php
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
| Included PHP Constant file
| Check Constant values
|--------------------------------------------------------------------------
|
|  Comment Description
|
 */

include_once ABSPATH . 'config/Constants.php';

/*
|--------------------------------------------------------------------------
| Get all AjaxPOST request here.. for Non Htaccess Support Server or Not Enable
| MODE Re Write Module Apache
|--------------------------------------------------------------------------
|
|  Comment Description
|
 */

$config = include_once ABSPATH . 'config/Config.php';

/*
|--------------------------------------------------------------------------
| load Instagram class file
| Check Class Instagram
|--------------------------------------------------------------------------
|
|  Comment Description
|
 */

require_once ABSPATH . 'includes/Instagram.php';

/*
|--------------------------------------------------------------------------
| load App Helper file
| Check Helper File
|--------------------------------------------------------------------------
|
|  Comment Description
|
 */

require_once ABSPATH . 'includes/Helper.php';

// pre($_REQUEST);die;
// pre($config);

/*
|--------------------------------------------------------------------------
| Application Error Settings
| On/Off PHP Errors
|--------------------------------------------------------------------------
|
|  Comment Description
|
 */
ini_set('display_errors', $config['show_error']);
ini_set('display_startup_errors', $config['show_error']);
error_reporting($config['show_error']);

// create Instagram class object
$instagram = new InstagramWrapper();

// get action request
if (isset($_REQUEST['request_action'])) {
    extract($_REQUEST);
} else {
    $request_action = 'pull_hashtag';
}

// condition for account info
if (in_array($request_action, array('pull_media', 'pull_account'))) {
    // echo output
    echo $instagram->insta_account();
}
// condition for hash tag search
else {
    echo $instagram->insta_search();
}

/*
 * Debug JSON Data Test
 * @var [type]
 */
// $json = file_get_contents('data.json');
// header('Content-Type: application/javascript');
// echo $json;
