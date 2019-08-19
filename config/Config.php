<?php
/*
|--------------------------------------------------------------------------
| LOG Config Details
|--------------------------------------------------------------------------
|
|  Set the log folder name where log file want to save
|
 */
return [
    'show_error'             => true,
    'environment'            => 'development',
    'logs'                   => true,
    'log_file_name'          => DEBUG,
    'log_folder'             => dirname(__FILE__) . '/../logs',
    'file_folder_permission' => 0777,
];
