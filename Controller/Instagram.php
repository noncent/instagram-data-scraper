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
    public $link_array = [];
    /**
     * collection of data
     * @var array
     */
    public $data = [];
    /**
     * [$result_type description]
     * @var string
     */
    public $result_type = 'Java-Script';
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
        $url = [];
        // if data set
        if (isset($_POST['iUrl']) && !empty($_POST['iUrl'])) {
            // array to php vars
            extract($_POST);
            // create array
            $url = [$iUrl];
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
        // get source html data
        $source = @file_get_contents($link);
        // get script json data
        $first_set_pattern = "/<script[^>](.*)_sharedData(.*)<\/script>/";
        // replacement string
        $get_json_data_pattern = '/(?i)<script[[:space:]]+type="text\/javascript"(.*?)>([^\a]+?)<\/script>/si';
        // if source get
        if ($source) {
            // filter script tag
            preg_match_all($first_set_pattern, $source, $matches);
            // get script inside json data
            preg_match($get_json_data_pattern, array_shift($matches[0]), $array_string);
            // return script directly
            $this->data = $array_string[2];
        } else {
            return $this->error_trace("Invalid or corrupt Instagram url: " . $link);
        }
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
