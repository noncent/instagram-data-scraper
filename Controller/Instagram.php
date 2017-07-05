<?php
/**
 * Instagram Scrapper Class
 */
class Instagram
{
    /**
     * set base url profile link
     * @var string
     */
    public $base_url = "https://www.instagram.com";
    /**
     * set profile link url
     * @var string
     */
    public $profile_base_url = "";
    /**
     * get all links array
     * @var array
     */
    public $link_array = array();
    /**
     * collection of data
     * @var array
     */
    public $data = array();
    /**
     * JSON or ARRAY
     * Default is JSON to build awesome view, if you set ARRAY you have to make your own
     * JavaScript template by returning response as array
     * @var string
     */
    public $result_type = 'JSON';
    /**
     * [$error description]
     * @var string
     */
    public $error = 'window._sharedData = {"error": "{{error}}"};';
    /**
     * [__construct description]
     * @param array $url [description]
     */
    public function __construct()
    {
        $url = array();
        // if data set & url
        if (filter_input(INPUT_POST, 'iUrl', FILTER_VALIDATE_URL)) {
            // array to php vars
            extract($_POST);
            // create array
            $url = array($iUrl);
        }
        if (is_array($url) && count($url) > 0) {
            $this->link_array = $url;
        } else {
            return $this->error_trace("Invalid or corrupt Instagram url request.");
        }
    }
    /**
     * [fetch_data description]
     * @return [type] [description]
     */
    public function fetch_data()
    {
        if (!is_array($this->link_array)) {
            return $this->error_trace("Data not set or invalid");
        } else {
            foreach ($this->link_array as $index => $link) {
                $this->insta_connect($link);
            }
            return $this->load_view();
        }
    }
    /**
     * Display the data
     * @return [type] [description]
     */
    public function load_view()
    {
        // set json header
        header('Content-Type: application/javascript');
        // get script
        return $this->data;
    }
    /**
     * [insta_connect description]
     * @param [type] $link [description]
     */
    public function insta_connect($link, $loop = false)
    {
        // get script json data
        $first_set_pattern = "/<script[^>](.*)_sharedData(.*)<\/script>/";
        // replacement string
        $get_json_data_pattern = '/(?i)<script[[:space:]]+type="text\/javascript"(.*?)>([^\a]+?)<\/script>/si';
        // check allow_url_fopen settings
        if (ini_get('allow_url_fopen')) {
            // get source html data
            $source = @file_get_contents($link);
        } else {
            // get source html data by using cURL
            $source = $this->curl_get_contents($link);
            // check return data, if no error
            if ($source['error_no'] == '0') {
                $source = $source['content'];
            } else {
                // cURL error message
                return $this->error_trace($source['error_message']);
            }
        }
        // if source get
        if ($source) {
            // filter script tag
            preg_match_all($first_set_pattern, $source, $matches);
            // get script inside json data
            preg_match($get_json_data_pattern, array_shift($matches[0]), $array_string);
            // check result request type
            if ($this->result_type === 'ARRAY') {
                // convert javscript code to php assoc array object
                $js2php_array = json_decode(preg_replace('/(window\.\_sharedData \=|\;)/', '', $array_string[2]), true);
                // build result array, you have to manage html view by array
                $this->data = $this->build_useful_array($js2php_array);
            } else {
                // return script directly
                $this->data = $array_string[2];
            }
        } else {
            return $this->error_trace("Invalid or corrupt Instagram url: " . $link);
        }
    }
    /**
     * file_get_contents fallback method
     * @param  [type] $url [description]
     * @return [type]      [description]
     */
    public function curl_get_contents($url)
    {
        $options = array(
            CURLOPT_RETURNTRANSFER => true, // return web page
            CURLOPT_HEADER         => false, // don't return headers
            CURLOPT_FOLLOWLOCATION => true, // follow redirects
            CURLOPT_ENCODING       => "", // handle all encodings
            CURLOPT_USERAGENT      => "spider", // who am i
            CURLOPT_AUTOREFERER    => true, // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120, // timeout on connect
            CURLOPT_TIMEOUT        => 120, // timeout on response
            CURLOPT_MAXREDIRS      => 10, // stop after 10 redirects
            CURLOPT_SSL_VERIFYPEER => false // Disabled SSL Cert checks
        );
        $ch = curl_init($url);
        curl_setopt_array($ch, $options);
        $content = curl_exec($ch);
        $err     = curl_errno($ch);
        $errmsg  = curl_error($ch);
        $header  = curl_getinfo($ch);
        curl_close($ch);
        $header['error_no']      = $err;
        $header['error_message'] = $errmsg;
        $header['content']       = $content;
        return $header;
    }
    /**
     * Build the array data from json respond
     * @param  [type] $data [description]
     * @return [type]       [description]
     */
    public function build_useful_array($data)
    {
        // pre($data);
        $collection = array();
        // collect all personal information, same key as in result data
        $collection['country_code']  = $data['country_code'];
        $collection['language_code'] = $data['language_code'];
        // get
        extract(array_shift($data['entry_data']['ProfilePage']));
        // this is total post count
        $collection['count']              = $user['media']['count'];
        $collection['biography']          = $user['biography'];
        $collection['external_url']       = $user['external_url'];
        $collection['count']              = $user['followed_by']['count'];
        $collection['count']              = $user['follows']['count'];
        $collection['follows_viewer']     = $user['follows_viewer'];
        $collection['full_name']          = $user['full_name'];
        $collection['id']                 = $user['id'];
        $collection['username']           = $user['username'];
        $collection['external_url']       = $user['external_url'];
        $collection['profile_pic_url']    = $user['profile_pic_url'];
        $collection['followed_by_viewer'] = $user['followed_by_viewer'];
        // collect all post information
        if ($user['media']['nodes']) {
            // parse one by one
            foreach ($user['media']['nodes'] as $index => $array) {
                $collection['post']['data'][$index]['id']            = $array['id'];
                $collection['post']['data'][$index]['thumbnail_src'] = $array['thumbnail_src'];
                $collection['post']['data'][$index]['is_video']      = $array['is_video'];
                $collection['post']['data'][$index]['date']          = $array['date'];
                $collection['post']['data'][$index]['display_src']   = $array['display_src'];
                $collection['post']['data'][$index]['caption']       = isset($array['caption']) ? $array['caption'] : '';
                $collection['post']['data'][$index]['comments']      = $array['comments']['count'];
                $collection['post']['data'][$index]['likes']         = $array['likes']['count'];
            }
        }
        return $collection;
    }
    /**
     * [error_trace description]
     * @param  string $error_message  [description]
     * @return [type] [description]
     */
    public function error_trace($error_message = '')
    {
        return $this->data = str_replace('{{error}}', $error_message, $this->error);
    }
}
