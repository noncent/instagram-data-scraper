# ⚠️ Warning

Dear folks,

Instagram has made several modifications to their APIs and Endpoints, which have resulted in multiple issues. We are currently keeping a close eye on all the changes and will provide a permanent solution shortly. We apologize for any inconvenience caused in the meantime.

---

### :star: Instagram-Data-Scraper | Version 2.6 (Beta) | Latest Update: May 11th, 2021

---
As per my promise, the search feature for @useraccount is now accessible. But, to avail this feature, you need to set up your own Instagram session ID. To obtain your session ID, log in to your Instagram account and copy the session ID from your browser. Click the 'Set session' button for further assistance.

---
### :see_no_evil: What is Instagram Data Scraper?


The Instagram Data Scraper is a PHP script that allows users to enter an Instagram username or hashtag and receive data related to that account or post. The information provided includes post counts, likes, comments, images, and likes on images. Currently, the script displays basic user information such as name, biography, followers, following, posts, likes, comments, and views. However, users can access additional details by updating the Controller/Instagram Class in the PHP script code with "public $result_type = 'JSON' or 'ARRAY'." The script also uses jQuery to create Awesome Views and handle each request individually. It is a small yet powerful piece of code that we believe will be useful for you.

---

### :innocent: What's new in Instagram Data Scraper (Beta)?
Following features are available for now:
| Feature                             | Status   |
|-------------------------------------|----------|
| Instagram Reels Search              | WIP      |
| Instagram Reels Likes/Views/Play/Comments & Counts | WIP      |
| Instagram Reels Video Play          | WIP      |
| Top 100 Posts for user              | WIP      |
| Top trending hashtags               | WIP      |
| Trend by location                   | WIP      |
| Most liked posts                    | WIP      |
| Hashtag Likes                       | &#x2713; |
| Hashtag Comments                    | &#x2713; |
| Hashtag Keywords                    | &#x2713; |
| Hashtag Video Views                 | &#x2713; |
| Hashtag Top Post Keywords           | &#x2713; |
| Hashtag Top Post Preview            | &#x2713; |
| Hashtag Top Post Data               | &#x2713; |
| User Account Search                 | &#x2713; |
| User Account Biography              | &#x2713; |
| User Account Followers              | &#x2713; |
| User Account Following              | &#x2713; |
| User Account Posts                  | &#x2713; |
| User Account Likes                  | &#x2713; |
| User Account Comments               | &#x2713; |
| User Account Views                  | &#x2713; |
| Download data in excel              | &#x2713; |


---

###  :scream_cat: Screenshot - [A] 2.6 (Beta) released:
![App Screenshot](https://github.com/neerajsinghsonu/Instagram-Scraper/blob/master/public/core/images/2.6.screen.app.png)

<p>&nbsp;</p>

###  :scream_cat: Screenshot - [B] 2.6 (Beta) released:
![App Screenshot](https://github.com/neerajsinghsonu/Instagram-Scraper/blob/master/public/core/images/2.6.screen.app-I.png)
---

###  :pencil2: Development Notes:
- The Instagram Data Scraper tool is a powerful tool that can extract various data related to a specific hashtag. It can retrieve information such as the number of likes, views, comments and the count of keywords used. In addition, it has the ability to fetch the top 10 posts associated with the hashtag. This feature is highly beneficial for marketers and social media analysts who want to track the performance of specific hashtags and analyze user engagement. By gathering data on likes, views, and comments, users can gain valuable insights into the popularity of certain hashtags and the type of content that resonates with their audience.

- You have the option to customize the N Depth Level Search by editing the JavaScript code in the Instagram Data Scraper tool. The current setting is set to 4 levels, which can be found in the 'this.maxRequestNo = 4;' line of the core.js file. This depth control is currently only available for keyword searches, as account searches have no limit. However, it's possible that in the future, a Depth Controller for Account Search may be implemented as well.

- Please note that the Instagram Scraper tool does not follow any standard API rules, as it is intended for proof-of-concept/demo purposes only. If you are considering using this tool for commercial purposes, you must have your own Instagram valid API access and modify the request part accordingly to comply with Instagram's API rules. We do not condone the use of the Instagram Scraper tool for any activity that violates Instagram's terms of use.

- At present, the Instagram Scraper tool operates purely on a scrape method, without any API implementation. It accesses certain Instagram links, which then return JSON data that the application uses to create views based on business logic. Please note that scraping Instagram data without proper authorization or consent may violate Instagram's terms of use and could potentially result in legal consequences.

- It's important to note that the Instagram links used by the Scraper tool are subject to change at any time, so it's not advisable to rely on them. To ensure a stable and reliable source of Instagram data for your application, it's recommended to have a valid Instagram API access and build your application using the API. Below are some examples of links that the Scraper tool may access:

| Endpoint | Description |
| --- | --- |
| https://www.instagram.com/{username}/?__a=1 | Returns JSON data for a user's profile |
| https://www.instagram.com/explore/tags/{hashtag}/?__a=1 | Returns JSON data for a hashtag search |
| https://www.instagram.com/web/search/topsearch/?query={query} | Returns JSON data for a general search query |
| https://www.instagram.com/web/search/hashtag/?query={query}&__a=1 | Returns JSON data for a hashtag search query |


Please keep in mind that using unauthorized or non-approved methods to access Instagram data may be a violation of Instagram's terms of use and could result in legal consequences.

- The following is a simplified flow of how the Instagram Scraper tool works:

The user inputs an @username or #hashtag into the tool.
The tool accesses certain Instagram links to retrieve relevant JSON data, such as user information, post counts, likes, comments, and keywords.
The tool uses this data to create views, such as user profiles and posts, using business logic.
The views are presented to the user for analysis and further use.
It's important to note that this is a simplified flow and there may be additional steps involved in the actual implementation of the tool. Additionally, please keep in mind that unauthorized access to Instagram data may be a violation of Instagram's terms of use and could result in legal consequences.

The code for the Instagram Scraper tool has been commented thoroughly to aid understanding of the flow and functionality. If there are any suggestions or improvements to be made, please let the developer know.

The basic flow of the application can be summarized in two steps:

(A) User Input > Account or Hashtag > Request Link > JSON Response > Create Result

(B) JSON Response -> If Next Page or Has Next Page > User Input > Account or Hashtag > Request Link > JSON Response > Create Result

In step (A), the user inputs an @username or #hashtag, and the tool accesses a specific Instagram link to request JSON data related to that input. Once the JSON response is received, the tool uses the data to create a result that can be presented to the user.

In step (B), if the JSON response indicates that there is a next page or has more data available, the tool will prompt the user for additional inputs to request the next set of data. This process continues until all desired data has been retrieved and results can be created.


---

###  :package: Data available in Instagram Data Scraper

1 - Account information - N Level Search

    - User Biography
    - User Followers Counts
    - User Followings Count
    - User Posts Count
    - User Likes Count
    - User Comments Count
    - User Views Count
    - User's Post (Likes)

2 - Search information - 4 Level Search

    - Unique Keyword Used and Count
    - No Of Posts by Hashtags
    - No Of Likes by Hashtags
    - No Of Comments by Hashtag
    - Top 10 Posts, Comments and Likes by Hashtag
    - Keyword summary, how many times a word used in Posts

---

### Instagram JSON Response Endpoints & Parameters:

```php

/**
 * Instagram links to get JSON data
 * @var array
 */

* Next-ID = JSON Response page_info > has_next_page > end_cursor

public $endpoint = array(
    // returns an user information - first set - html data
    'account'                         => 'https://www.instagram.com/{user}',

    // returns an user information - next set - html data until has_next_page = 0 or null or false
    'account_next_call'               => 'https://www.instagram.com/{user}/?max_id={max_id}',

    // returns an user account information - first set - in json format
    'account_json'                    => 'https://www.instagram.com/{user}/?__a=1',

    // returns an user account information - next set -in json format until has_next_page = 0 or null or false
    'account_json_next_call'          => 'https://www.instagram.com/{user}/?__a=1&max_id={max_id}',

    // returns json data for hashtag search or keyword search in json format - first set
    'search_tags_json'                => 'https://www.instagram.com/explore/tags/{tag}/?__a=1',

    // returns json data for hashtag search or keyword search in json format - next set until has_next_page = 0 or null or false
    'search_tags_json_next_call'      => 'https://www.instagram.com/explore/tags/{tag}/?__a=1&max_id={max_id}',

    // get all available hashtag or keyword or account name list, e.g. Instagram Search Box Auto complete list
    'search_all_tags_json'            => 'https://www.instagram.com/web/search/topsearch/?context=blended&query={keyword}&__a=1',

    // send tag code and get all user related information
    'search_username_by_tagcode_json' => 'https://www.instagram.com/p/{code}/?tagged={tag}&__a=1',
);


```
---

### For your application

Use PHP Class, HTML & Core.js to tweak as per your requirement.

You can see a working demo here [Click to See](https://drive.google.com/file/d/0B2Jr4ZrDD_hFbkhLdXRFb0xBQk0/view)

---

###  :wrench: Requirement

> Apache version => 2.4
> PHP version =>5.*
> PHP allow_url_fopen & openssl or cURL enable
> Browser & Off-course internet Connection :)


### PHP Settings:
> A-) allow_url_fopen + openssl extension OR cURL enable


### Apache Settings:
> B-) Enable .htaccess (optional)


### Notes

> C-) Rename dev.htaccess to .htaccess (If you are using windows just rename file dev.htaccess to .htaccess. and the window will ignore the last dot.. )

---

###  :chart_with_upwards_trend: Change logs:
> Committed repo change code version 2.6
- Video views count added in Table and Excel #24
- User account search activated


> Committed repo change code version 2.5.3
- Video total view count added at top of the bar
- Video view count added for each hashtag

> Committed repo change code version 2.5.2
- Account Information Likes has Post Preview

> Committed repo change code version 2.5.1
- Min or Full Account Information Toggle Button

> Committed repo change code version 2.5
- Now you can Search #Hashtags and @UserAccounts simultaneously - New Feature
- Searching Keyword added - New Feature
- Keywords Analytics - New Feature
- Top Posts - New Feature
- Top Post Comments - New Feature
- Each request is being handled separately; so don't take a hiccup if you click somewhere during the request - Improved
- Pure HTML file to make an easy template to use in PHP or ASP or any language.
- Search tips: '#' to search Hashtags and '@' to search account information
- Use 'Space' to search multiple hashtags and accounts
- Download in Excel available

> Committed repo change code version 2.1
- 8 - Updated Class Instagram
- 9-  Updated JavaScript Code
- 11- Updated Content
- 12- Add MultiCurl feature [Thanks to @Pete Warden][https://github.com/petewarden/ParallelCurl]
- 13- Added Error Handling

> Committed repo change code version 2.0
- 1 - Added data file example
- 2 - Added result PHP array example
- 3 - Updated navbar CSS
- 4 - Update js file and CSS file and minify files
- 5 - Remove htaccess [re_write apache module] dependencies
- 6 - Added PHP Code to build PHP array
- 7 - Some minor UI changes
`

The developer encourages users to freely use and enjoy the Instagram Scraper tool. Any feedback or suggestions for enhancement are also most welcome.

---
### Request:
The developer hopes that users will find the Instagram Scraper tool useful and enjoyable. While it is provided free of cost for learning purposes, it should not be used to harm anyone or for any illegal activities. It is important to respect the privacy of others and the effort they have put into their content. Please do not attempt to break anything or engage in any malicious activities.

Remember that the world is beautiful and full of wonder, and we should use technology to enhance our lives and share our experiences in a positive and respectful manner.


Thank you all :heart:
