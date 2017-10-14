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
