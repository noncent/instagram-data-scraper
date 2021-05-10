<?php
// This class is designed to make it easy to run multiple curl requests in parallel, rather than
// waiting for each one to finish before starting the next. Under the hood it uses curl_multi_exec
// but since I find that interface painfully confusing, I wanted one that corresponded to the tasks
// that I wanted to run.
//
// To use it, first create the ParallelCurl object:
//
// $parallelcurl = new ParallelCurl(10);
//
// The first argument to the constructor is the maximum number of outstanding fetches to allow
// before blocking to wait for one to finish. You can change this later using setMaxRequests()
// The second optional argument is an array of curl options in the format used by curl_setopt_array()
//
// Next, start a URL fetch:
//
// $parallelcurl->startRequest('http://example.com', 'on_request_done', array('something'));
//
// The first argument is the address that should be fetched
// The second is the callback function that will be run once the request is done
// The third is a 'cookie', that can contain arbitrary data to be passed to the callback
//
// This startRequest call will return immediately, as long as less than the maximum number of
// requests are outstanding. Once the request is done, the callback function will be called, eg:
//
// on_request_done($content, 'http://example.com', $ch, array('something'));
//
// The callback should take four arguments. The first is a string containing the content found at
// the URL. The second is the original URL requested, the third is the curl handle of the request that
// can be queried to get the results, and the fourth is the arbitrary 'cookie' value that you
// associated with this object. This cookie contains user-defined data.
//
// By Pete Warden <pete@petewarden.com>, freely reusable, see http://petewarden.typepad.com for more
class ParallelCurl
{
    public $max_requests;
    public $options;
    public $outstanding_requests;
    public $multi_handle;
    public function __construct($in_max_requests = 500, $in_options = array())
    {
        $this->max_requests         = $in_max_requests;
        $this->options              = $in_options;
        $this->outstanding_requests = array();
        $this->multi_handle         = curl_multi_init();
    }
    //Ensure all the requests finish nicely
    public function __destruct()
    {
        $this->finishAllRequests();
    }
    // Sets how many requests can be outstanding at once before we block and wait for one to
    // finish before starting the next one
    public function setMaxRequests($in_max_requests)
    {
        $this->max_requests = $in_max_requests;
    }
    // Sets the options to pass to curl, using the format of curl_setopt_array()
    public function setOptions($in_options)
    {
        $this->options = $in_options;
    }
    // Start a fetch from the $url address, calling the $callback function passing the optional
    // $user_data value. The callback should accept 3 arguments, the url, curl handle and user
    // data, eg on_request_done($url, $ch, $user_data);
    public function startRequest($url, $callback, $user_data = array(), $post_fields = null)
    {
        if ($this->max_requests > 0) {
            $this->waitForOutstandingRequestsToDropBelow($this->max_requests);
        }
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt_array($ch, $this->options);
        curl_setopt($ch, CURLOPT_URL, $url);
        if (isset($post_fields)) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
        }
        curl_multi_add_handle($this->multi_handle, $ch);
        $ch_array_key                              = (int) $ch;
        $this->outstanding_requests[$ch_array_key] = array(
            'url'       => $url,
            'callback'  => $callback,
            'user_data' => $user_data,
        );
        $this->checkForCompletedRequests();
    }
    // You *MUST* call this function at the end of your script. It waits for any running requests
    // to complete, and calls their callback functions
    public function finishAllRequests()
    {
        $this->waitForOutstandingRequestsToDropBelow(1);
    }
    // Checks to see if any of the outstanding requests have finished
    private function checkForCompletedRequests()
    {
        /*
        // Call select to see if anything is waiting for us
        if (curl_multi_select($this->multi_handle, 0.0) === -1)
        return;
        // Since something's waiting, give curl a chance to process it
        do {
        $mrc = curl_multi_exec($this->multi_handle, $active);
        } while ($mrc == CURLM_CALL_MULTI_PERFORM);
         */
        // fix for https://bugs.php.net/bug.php?id=63411
        do {
            $mrc = curl_multi_exec($this->multi_handle, $active);
        } while ($mrc == CURLM_CALL_MULTI_PERFORM);
        while ($active && $mrc == CURLM_OK) {
            if (curl_multi_select($this->multi_handle) != -1) {
                do {
                    $mrc = curl_multi_exec($this->multi_handle, $active);
                } while ($mrc == CURLM_CALL_MULTI_PERFORM);
            } else {
                return;
            }
        }
        // Now grab the information about the completed requests
        while ($info = curl_multi_info_read($this->multi_handle)) {
            $ch           = $info['handle'];
            $ch_array_key = (int) $ch;
            if (!isset($this->outstanding_requests[$ch_array_key])) {
                die("Error - handle wasn't found in requests: '$ch' in " .
                    print_r($this->outstanding_requests, true));
            }
            $request   = $this->outstanding_requests[$ch_array_key];
            $url       = $request['url'];
            $content   = curl_multi_getcontent($ch);
            $callback  = $request['callback'];
            $user_data = $request['user_data'];
            call_user_func($callback, $content, $url, $ch, $user_data);
            unset($this->outstanding_requests[$ch_array_key]);
            curl_multi_remove_handle($this->multi_handle, $ch);
        }
    }
    // Blocks until there's less than the specified number of requests outstanding
    private function waitForOutstandingRequestsToDropBelow($max)
    {
        while (1) {
            $this->checkForCompletedRequests();
            if (count($this->outstanding_requests) < $max) {
                break;
            }
            usleep(10000);
        }
    }
}
