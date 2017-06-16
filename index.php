<?php
// Get System Default Directory Separator
define('DS', DIRECTORY_SEPARATOR);
// Application Environment
define('ENV', 'development');
// error reporting on/off
if (ENV == 'development') {
    // Error reporting
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}
/*
 * App URL/ BASE Url
 * @var [type]
 */
define('APP_URL', (((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') || (!empty($_SERVER['HTTP_X_FORWARDED_SSL']) && $_SERVER['HTTP_X_FORWARDED_SSL'] == 'on') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) || (isset($_SERVER['HTTP_X_FORWARDED_PORT']) && $_SERVER['HTTP_X_FORWARDED_PORT'] == 443) || (isset($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https')) ? 'https' : 'http') . "://{$_SERVER['SERVER_NAME']}" . str_replace(basename($_SERVER['SCRIPT_NAME']), "", $_SERVER['SCRIPT_NAME']));
/*
 * App Controller Path
 * @var [type]
 */
define('Controller_Path', str_replace(DS, '/', dirname(__FILE__) . '/Controller/'));
/*
 * App Template Path
 * @var [type]
 */
define('Template_Path', str_replace(DS, '/', dirname(__FILE__) . '/Templates/'));
/*
 * App Views Path
 * @var [type]
 */
define('View_Path', str_replace(DS, '/', dirname(__FILE__) . '/Views/'));
/*
 * App Helpers
 * @var [type]
 */
define('Helpers_Path', str_replace(DS, '/', dirname(__FILE__) . '/Helpers/'));
// Adding Helper File
require_once Helpers_Path . 'Helper.php';
/* Split the parts of the request by / */
$request = (isset($_GET['request']) ? explode('/', $_GET['request']) : null);
// Get Controller Name
$Controller = isset($request[0]) ? $request[0] : null;
// Get Method Name
$Method = isset($request[1]) ? $request[1] : null;
// Get Params Name/Value
$Params = isset($request[2]) ? $request[2] : null;
// load controller if not empty
if (!empty($Controller)) {
    // make controller name
    $controller_call = ucfirst($Controller);
    // load controller if exist
    if (load_controller($controller_call)) {
        // adding controller file
        require_once Controller_Path . $controller_call . '.php';
        // if Class Method exist
        if (!empty($Method)) {
            // Make Class Object
            $instance = new $controller_call();
            // if Class Method found
            if (method_exists($instance, $Method)) {
                // get data
                echo $instance->$Method();
            }
        }
    }
} else {
    // Page View
    render_template();
}
