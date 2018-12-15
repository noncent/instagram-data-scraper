<?php

// Added multi cURL Class
require_once 'ParallelCurl.php';
/* class start */
/**
 * Instagram PHPClass File
 * This is main Class file to get all Instagram information
 * The Instagram Class required open file url & openssl OR Curl
 * if that's requirement doesn't meet, you wont able to run this program
 *
 * @version: 2.2.1
 * @build: PHP Class
 * @date: 8 August 2017
 * @last-updated:
 * @author: Neeraj Singh
 */
/* class start */
class Instagram
{
    /**
     * Here all urls which use for action in InstaGram
     * @var array
     */
    public $endpoint = array(

        'account'                         => 'https://www.instagram.com/{user}',

        'account_next_call'               => 'https://www.instagram.com/{user}/?max_id={max_id}',

        'account_json'                    => 'https://www.instagram.com/{user}/?__a=1',

        'account_json_next_call'          => 'https://www.instagram.com/{user}/?__a=1&max_id={max_id}',

        'account_media_json'              => 'https://instagram.com/graphql/query/?query_id=17888483320059182&id={user_id}&first=12',

        'account_media_json_next_call'    => 'https://instagram.com/graphql/query/?query_id=17888483320059182&id={user_id}&first=12&after={max_id}',

        'search_tags_json'                => 'https://www.instagram.com/explore/tags/{tag}/?__a=1',

        'search_tags_json_next_call'      => 'https://www.instagram.com/explore/tags/{tag}/?__a=1&max_id={max_id}',

        'search_all_tags_json'            => 'https://www.instagram.com/web/search/topsearch/?context=blended&query={keyword}&__a=1',

        'search_username_by_tagcode_json' => 'https://www.instagram.com/p/{code}/?tagged={tag}&__a=1',
    );
    /**
     * Set your data scrape fetch mode
     * OPTIONS - PHP_ARRAY or JSON
     * JSON, returns data in ajax response as json object
     * PHP_ARRAY, returns data in ajax response as html content
     * @var string
     */
    protected $scrap_mode = 'JSON';
    /**
     * Default action request
     * OPTIONS: pull_account|pull_hashtag
     * @var array
     */
    protected $default_request_action = array(
        'pull_account', 'pull_hashtag', 'pull_media',
    );
    /**
     * The request action
     * @var string
     */
    public $request_action = 'pull_account';
    /**
     * Response for Request
     * @var string
     */
    public $curlResponseData = null;
    /**
     * Collect all inks or link or #hahtag or name
     * @var array
     */
    private $users_input = array();
    /**
     * Instagram link input element name
     * @var string
     */
    private $input_key = 'keyword';
    /**
     * Collection of all regex string and json format
     * @var string
     */
    protected $regexPattern = array(

        // Get  '<script></script>' tag from source code, html
        'script'          => '/<script[^>](.*)_sharedData(.*)<\/script>/',

        // This is RegxPattern to extract JavaScript variables from html source code
        'json'            => '/(?i)<script[[:space:]]+type="text\/JavaScript"(.*?)>([^\a]+?)<\/script>/si',

        // This is RegexPattern to get only json object for php
        'object'          => '/(window\.\_sharedData \=|\;)/',

        // short call json data __a=1
        'filter_response' => 'window._sharedData={"entry_data":{"ProfilePage":[{source}]}};',

        // If in case any error, return this json in ajax response
        'error_response'  => 'window._sharedData = {"error": "{error}"};',

        // This RegexPattern to detect if response is null/empty
        'empty_error'     => '"entry_data": {}',
    );

    /**
     * Dont change if want to save json data in mysql
     * Note: You have to parse PHP array and will have to make your desire output to save
     *
     * @var string
     */
    protected $save_as = 'mysql';

    /**
     * Collect all data as in PHP array format
     *
     * @var array
     */
    protected $curlResponseDataAsPhpArray = array();

    /**
     * Class constructor function
     * @param string $request_action
     */
    public function initialize($request_action = 'pull_account', $request_data = array())
    {

        // validate request

        if ($this->validateRequestType() === true) {
            // set action
            $this->request_action = $request_action;

            // set data in class property

            if (!empty($request_data) && is_array($request_data)) {
                // set link or search array data
                $this->users_input = $request_data;
            } else {

                // set error response
                $this->exitErrorString('request');
            }
        } else {

            // set error response
            $this->exitErrorString('request');
        }
    }

    /**
     * Check what type of request we got
     * it is search or simple account info
     */
    private function validateRequestType()
    {
        return in_array($this->request_action, $this->default_request_action);
    }

    /**
     * Set action as per request
     * to proceed further orations
     */
    public function setInstagramRequest()
    {

        if (1) {
            // check action type & build request url according to request

            if ($this->request_action === 'pull_account') {
                // build request url

                if (isset($this->users_input['max_id'])) {
                    $this->users_input = str_replace(array('{user}', '{max_id}'), array($this->users_input[$this->input_key], $this->users_input['max_id']), $this->endpoint['account_json_next_call']);
                } else {
                    $this->users_input = str_replace('{user}', $this->users_input[$this->input_key], $this->endpoint['account_json']);
                }

                // user's account information requested, bulk mode, account name information, single user

                if ($this->sendInstagramRequest() && $this->buildResultFromCurl()) {
                    // return response
                    return $this->getInstagramResponse();
                } else {

                    // fall-back error data

                    if (is_null($this->curlResponseData)) {
                        $this->exitErrorString('url');
                    }

                    // return response

                    return $this->getInstagramResponse();
                }
            } elseif ($this->request_action === 'pull_hashtag') {

                // check if hash tag or account name

                if (trim($this->users_input[$this->input_key])) {
                    // build request url

                    if (isset($this->users_input['next']) && $this->users_input['next'] !== 'false') {
                        // if user send max_id as in request param next
                        $this->users_input = str_replace(array('{tag}', '{max_id}'), array($this->users_input[$this->input_key], $this->users_input['next']), $this->endpoint['search_tags_json_next_call']);
                    } else {

                        // if next param has false
                        $this->users_input = str_replace('{tag}', $this->users_input[$this->input_key], $this->endpoint['search_tags_json']);
                    }

                    // hash tag search

                    if ($this->sendInstagramRequest() && $this->buildResultFromCurl()) {
                        // return response
                        return $this->getInstagramResponse();
                    } else {

                        // fall-back error data

                        if (is_null($this->curlResponseData)) {
                            $this->exitErrorString('url');
                        }

                        // return response

                        return $this->getInstagramResponse();
                    }
                }
            } elseif ($this->request_action === 'pull_media') {

                // build request url

                if (isset($this->users_input['max_id'])) {
                    $this->users_input = str_replace(array('{user_id}', '{max_id}'), array($this->users_input[$this->input_key], $this->users_input['max_id']), $this->endpoint['account_media_json_next_call']);
                } else {
                    $this->users_input = str_replace('{user_id}', $this->users_input[$this->input_key], $this->endpoint['account_media_json']);
                }

                // user's media information requested, bulk mode, account name information, single user

                if ($this->sendInstagramRequest() && $this->buildResultFromCurl()) {
                    // return response
                    return $this->getInstagramResponse();
                } else {

                    // fall-back error data

                    if (is_null($this->curlResponseData)) {
                        $this->exitErrorString('default');
                    }

                    // return response

                    return $this->getInstagramResponse();
                }
            } else {

                // error request
                $this->exitErrorString('request');
            }
        } else {
            return $this->getInstagramResponse();
        }
    }

    /**
     * Proceed Instagram Scraping
     */
    private function sendInstagramRequest()
    {

        // write_log('CatchUrlsLog.log', $this->users_input . PHP_EOL);
        // check allow_url_fopen settings
        if (ini_get('allow_url_fopen') && extension_loaded('openssl') && isset($force_openssl)) {
            // get source html data
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $this->users_input);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $this->curlResponseData = curl_exec($ch);
            curl_close($ch);

            // write_log('curl_response_data.log', $this->curlResponseData);

            // pre($http_response_header);

            // check return data status

            if ($this->curlResponseData != false) {
                // return status
                return true;
            } else {
                $this->curlResponseData = null;

                return true;
            }
        }

        // make sure cURL enable
        elseif (function_exists('curl_version')) {

            // execute multi curl
            $parallelcurl = new \ParallelCurl();

            // set curl option
            $parallelcurl->setOptions($this->cUrlOptionHandler());

            // send link and get response by callback
            $parallelcurl->startRequest($this->users_input, function ($data) {

                // set response data
                $this->curlResponseData = $data;
            });

            // get response
            $parallelcurl->finishAllRequests();

            // write_log('parallelcurl_response_data.log', $this->curlResponseData);

            //@todo MySQL Saving Configurations
            // collect data in array to store later in anywhere
            if (isset($this->save_as) && $this->save_as === 'mysql') {
                $this->save_as($this->curlResponseData);
            }

            // check return data status

            if ($this->curlResponseData) {
                // return status
                return true;
            } else {
                // show error
                $this->exitErrorString('empty');
            }
        } else {

            // show error
            $this->exitErrorString('curl');
        }
    }

    /**
     * Check if array has valid urls or url
     * @param array $request
     */
    private function validateUrls($key, $request = array())
    {

        // extract array key as php vars
        extract($request);

        // url validation & data assign

        if ((isset($$key) && is_array($$key) && filter_var_array($$key, FILTER_VALIDATE_URL)) || isset($$key) && filter_input(INPUT_POST, $key, FILTER_VALIDATE_URL)) {
            return true;
        } else {
            $this->exitErrorString('url');
        }
    }

    /**
     * @return mixed
     */
    private function buildResultFromCurl()
    {

        if (!is_null($this->curlResponseData)) {
            // get <script></script> tag
            preg_match_all($this->regexPattern['script'], $this->curlResponseData, $filter);

            // get script inside json data
            preg_match($this->regexPattern['json'], array_shift($filter[0]), $output);

            // if source get check scrape mode

            if ($this->scrap_mode === 'PHP_ARRAY' && !empty($output)) {
                // if want to PHP array

                if ($this->request_action === 'pull_account') {
                    // check empty response

                    if (strpos($output[2], $this->regexPattern['empty_error']) !== false) {
                        // remove JavaScript var from data & build result array, you have to manage html view by array
                        $this->curlResponseData = $this->buildJsonToPhpArray(json_decode(preg_replace($this->regexPattern['object'], '', $output[2]), true));
                    } else {

                        // url error
                        $this->exitErrorString('url');
                    }
                }

                // else if filter on
                elseif ($this->request_action === 'pull_hashtag') {

                    // build result array, you have to manage html view by array
                    $this->curlResponseData = $this->buildJsonToPhpArray(json_decode($this->curlResponseData, true));
                } else {

                    // error response
                    $this->exitErrorString('default');
                }
            }

            // return as JavaScript json
            elseif ($this->scrap_mode === 'JSON' && !empty($output)) {

                // if wanna json data

                if ($this->request_action === 'pull_account') {
                    // check empty response

                    if (strpos($output[2], $this->regexPattern['empty_error']) !== false) {
                        $this->curlResponseData = $output[2];

                        // build result array, you have to manage html view by array
                        $this->curlResponseData = str_replace('{source}', $this->curlResponseData, $this->regexPattern['filter_response']);
                    } else {

                        // url error
                        $this->exitErrorString('url');
                    }
                } elseif ($this->request_action === 'pull_hashtag') {

                    // build result array, you have to manage html view by array
                    $this->curlResponseData = str_replace('{source}', $this->curlResponseData, $this->regexPattern['filter_response']);
                } else {
                    $this->exitErrorString('default');
                }
            } else {

                $this->curlResponseData = str_replace('{source}', $this->curlResponseData, $this->regexPattern['filter_response']);

                return $this->curlResponseData;
            }
        }
    }

    /**
     * Build the array data from json respond
     * @param  [type] $data           [description]
     * @return [type] [description]
     */
    public function buildJsonToPhpArray($data)
    {
        $array_data = array();

        // collect all personal information, same key as in result data
        $array_data['country_code']  = $data['country_code'];
        $array_data['language_code'] = $data['language_code'];

        // get
        extract(array_shift($data['entry_data']['ProfilePage']));

        // this is total post count
        $array_data['count']              = $user['media']['count'];
        $array_data['biography']          = $user['biography'];
        $array_data['external_url']       = $user['external_url'];
        $array_data['count']              = $user['followed_by']['count'];
        $array_data['count']              = $user['follows']['count'];
        $array_data['follows_viewer']     = $user['follows_viewer'];
        $array_data['full_name']          = $user['full_name'];
        $array_data['id']                 = $user['id'];
        $array_data['username']           = $user['username'];
        $array_data['external_url']       = $user['external_url'];
        $array_data['profile_pic_url']    = $user['profile_pic_url'];
        $array_data['followed_by_viewer'] = $user['followed_by_viewer'];

        // collect all post information

        if ($user['media']['nodes']) {
            // parse one by one

            foreach ($user['media']['nodes'] as $index => $array) {
                $array_data['post']['data'][$index]['id']            = $array['id'];
                $array_data['post']['data'][$index]['thumbnail_src'] = $array['thumbnail_src'];
                $array_data['post']['data'][$index]['is_video']      = $array['is_video'];
                $array_data['post']['data'][$index]['date']          = $array['date'];
                $array_data['post']['data'][$index]['display_src']   = $array['display_src'];
                $array_data['post']['data'][$index]['caption']       = isset($array['caption']) ? $array['caption'] : '';
                $array_data['post']['data'][$index]['comments']      = $array['comments']['count'];
                $array_data['post']['data'][$index]['likes']         = $array['likes']['count'];
            }
        }

        return $array_data;
    }

    /**
     * Display the data
     * @return [type] [description]
     */
    public function getInstagramResponse()
    {

        // set json header
        header('Content-type:application/javascript');

        // get script
        //$this->curlResponseData = str_replace( '{source}', $this->curlResponseData, $this->regexPattern['filter_response'] );

        return $this->curlResponseData;
    }

    /**
     * Set User Post Key for Instagram links
     * @param string $key [description]
     */
    public function setInputKey($key = 'keyword')
    {
        $this->input_key = $key;
    }

    /**
     * cURL settings
     * @return type
     */
    private function cUrlOptionHandler()
    {

        // create a random ip address
        $dynamic_ip = "" . mt_rand(0, 255) . "." . mt_rand(0, 255) . "." . mt_rand(0, 255) . "." . mt_rand(0, 255);

        // add additional curl options here

        return array(

            // return web page
            CURLOPT_RETURNTRANSFER => true,

            // don't return headers
            CURLOPT_HEADER         => false,

            // follow redirects
            CURLOPT_FOLLOWLOCATION => true,

            // handle all encodings
            CURLOPT_ENCODING       => "",

            // set referrer on redirect
            CURLOPT_AUTOREFERER    => true,

            // timeout on connect
            CURLOPT_CONNECTTIMEOUT => 120,

            // timeout on response
            CURLOPT_TIMEOUT        => 120,

            // stop after 10 redirects
            CURLOPT_MAXREDIRS      => 10,

            // Disabled SSL Cert checks
            CURLOPT_SSL_VERIFYPEER => false,

            // user agent be present in the request
            CURLOPT_USERAGENT      => 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13',

            // set fake ip address
            CURLOPT_HTTPHEADER     => array("REMOTE_ADDR: $dynamic_ip", "HTTP_X_FORWARDED_FOR: $dynamic_ip"),
        );
    }

    /**
     * Return all error string
     * @param  string    $error_key
     * @return private
     */
    private function exitErrorString($error_key = 'default')
    {

        // check request typeof error

        switch ($error_key) {
            case 'curl':
                $error = "You must enable Curl or 'allow_url_fopen' & 'openssl' to use this application";
                break;
            case 'url':
                $error = "Invalid or corrupt Instagram url request.";
                break;
            case 'json':
                $error = "You must enable Curl or 'allow_url_fopen' & 'openssl' to use this application";
                break;
            case 'request':
                $error = "Invalid data request or bad input send...";
                break;
            case 'empty':
                $error = "getting empty data or search suspended...";
                break;
            default:
                $error = "Error, unknown error determine. Please try again.";
                break;
        }

        // return error response in json format
        $this->curlResponseData = str_replace('{error}', $error, $this->regexPattern('error_response'));

        // return break status

        // return false;
    }

    /**
     * [regexPattern description]
     * @param  [type] $key            [description]
     * @return [type] [description]
     */
    public function regexPattern($key)
    {

        if (isset($this->regexPattern[$key])) {
            return $this->regexPattern[$key];
        } else {
            return false;
        }
    }
}

/* class end */
/**
 * Instagram PHPClass File
 * This is main Class file to get all Instagram information
 * The Instagram Class required open file url & openssl OR Curl
 * if that's requirement doesn't meet, you wont able to run this program
 *
 * @version: 2.2
 * @build: PHP Class
 * @date: 8 August 2017
 * @author: Neeraj Singh
 */
class InstagramWrapper extends Instagram
{
    /**
     * Instagram Class Vendor Object Bucket
     * @var null
     */
    protected $objInsta = null;
    /**
     * Instagram #hashtag search
     *
     * @return void
     */
    public function insta_search()
    {

        if (isset($_POST['keyword']) && $this->is_ajax_request()) {
            // this is ajax request, do something

            if (filter_input(INPUT_POST, 'request_action') && filter_input(INPUT_POST, 'keyword')) {
                // array keys to php vars
                extract($_POST);
            } else {

                // set request action value in class property
                $this->request_action = $request_action;
            }

            // parent Instagram constructor
            $this->initialize($request_action, $_POST);

            // call action
            $this->setInputKey('keyword');

            // get and return ajax response
            return $this->setInstagramRequest();
        } else {
            $this->exitErrorString();
        }
    }

    /**
     * Instagram @user account search
     *
     * @return void
     */
    public function insta_account()
    {

        if ($this->is_ajax_request()) {
            // this is ajax request, do something

            if (filter_input(INPUT_POST, 'request_action') && filter_input(INPUT_POST, 'keyword')) {
                // array keys to php vars
                extract($_POST);
            } else {

                // set request action value in class property
                $this->request_action = $request_action;
            }

            // parent Instagram constructor
            $this->initialize($request_action, $_POST);

            // call action
            $this->setInputKey('keyword');

            // get and return ajax response
            return $this->setInstagramRequest();
        } else {
            $this->exitErrorString();
        }
    }

    /**
     * If AJAX REQUEST MADE
     *
     * @return boolean
     */
    public function is_ajax_request()
    {

        return (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
    }

    /**
     * Save json data as in PHP array format to save later in MySQL
     *
     * @return void
     */
    public function save_as($json_data)
    {

        // !session_id() ? session_start() : null;
        // json to php array
        $json_data = json_decode($json_data, true);
        // store each data group by keywords
        //$_SESSION['array_data'][$_POST['keyword']][] = $json_data;
        // Create your logic to store data in database
        //foreach ($_SESSION['array_data'] as $keyword => $data) {
        # other code put here...
        //}

        // Create your logic to parse array to store data in database with $json_data
        // for more info see sample-array-data.txt

        // write_log('SearchArrayData.log', print_r($_SESSION['array_data'], true) . PHP_EOL);

    }

}
