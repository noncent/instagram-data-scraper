<?php

/**
 * @param array $data
 */
function pre($data = array())
{
    echo '<pre>', print_r($data, true), '</pre>';
    exit(4);
}
/**
 * [error_404 description]
 * @return [type] [description]
 */
function error_404()
{
    exit("404: Request page not found");
}

/**
 * Check if Server Supports htaccess
 * @return boolean [description]
 */
function is_htaccess_enable()
{
    // check if mode re_write enabled or not
    if (!in_array('mod_rewrite', apache_get_modules()) || !isset($_SERVER['HTACCESS'])) {
        return false;
    } else {
        return true;
    }

}

/**
 * Create log file with data
 *
 * @param [type] $file_name
 * @param [type] $anything
 * @return void
 */
function write_log($file_name, $anything)
{
    global $config;
    if ($config['logs'] === true) {
        // first check if log folder exists
        if (is_dir($config['log_folder']) && is_writable($config['log_folder'])) {
            // log file name
            if (!isset($file_name)) {
                $file_name = $config['log_folder'] . "/" . $config['log_file_name'];
            }
            // catch each request data
            file_put_contents($config['log_folder'] . "/" . $file_name, $anything, FILE_APPEND);
            // separator
            file_put_contents($config['log_folder'] . "/" . $file_name, PHP_EOL . str_repeat('+', 25) . PHP_EOL, FILE_APPEND);
        } else {
            // Make sure the log folder is writable
            mkdir($config['log_folder']);
            chmod($config['log_folder'], $config['file_folder_permission']);
        }
    }

}
