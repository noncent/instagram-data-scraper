---
## 💯 Wow! now we have [Online DEMO](https://dev.techcorpasia.com/instagram-data-scraper/) to use Instagram Data Scraper.
---

```diff
+ ## Instagram user account search work in progress...
```

## :star: Instagram-Super-Scraper V 2.5.3 (Dev) - Last Updated : 16-Sep-2018




##  :see_no_evil: What... Instagram Super Scraper DO?

Instagram Super Scraper is a PHP script which takes http://www.instagram/user-name/ as input and returns all information
related to user e.g. likes, comments, post count, images, likes on images etc... Currently only User Name, Biography, Followers,
Following, Posts, Likes, Comments & Views data in displaying. For other details you have to enable from php script code, Update
Controller/Instagram Class "public $result_type = 'JSON' or 'ARRAY';"

jQuery is using to build the Awesome View, to handle each and every request separately. I hope you like this small chunk of code
> The Instagram Scrapper is a PHP, Html, jQuery Script to get user's data from their Instagram account url.
> Example: https://www.instagram.com/any-user-name/, You can add any link and can get their Total Likes, Total Posts, Comments etc.
> You can also get their post images but it's just a POC so you have to change PHP Code. What you need to just decode json string >and parse by PHP arrays... let me know if you like or want improvement.. 

---

## :innocent: What's new in Instagram Super Scraper (ISS) (Dev)?
- All Images in account information (likes)
- Select Full or Minimum Account information by toggle option
- Now you can Search #Hashtags and @UserAccounts simultaneously - New Feature
- Searching Keyword added - New Feature
- Keywords Analytics - New Feature
- Top Posts - New Feature
- Top Post Comments - New Feature
- Each request is being handled separately; so don't take hiccup if you click some where during the request - Improved
- Pure html file to make easy template to use in PHP or ASP or any language.
- Search tips: '#' to search Hash tags and '@' to search account information
- Use 'Space' to search multiple hash tags and accounts
- Download in Excel available

---

##  :scream_cat: Screenshot of New 2.5.3 (Dev) released:
![App Screenshot](https://github.com/neerajsinghsonu/Instagram-Scraper/blob/master/public/core/images/2.5.3.screen.app.png)

---

##  :pencil2: Development Notes:
- Instagram Super Scraper can fetch #hashtag likes, views, top posts (10), comments, keywords count.
- You can set N Depth Level Search by editing JavaScript code, currently it's 4 level see. 'this.maxRequestNo = 4;' in core.js file. The depth control currently set for only keyword Search, Account Search is still open without any limit, but in future you may see Depth Controller for Account Search too.
- You may have Depth Search Controller in future release.
- Instagram Scraper doesn't follow any Standard API Rules (Because it's POC/Demo purpose only). If you thinking to make this as Commercial the Have OWN INSTAGRAM VALID API ACCESS, MODIFY THE REQUEST PART & ENJOY!
- Currently Instagram Scraper works on Purely Scrape Method, there is no API implemented. It's open some Instagram link which returns JSON data and then application creating view by business logics. 
- The Instagram links are uncertain and may change any time so Please don't depend on them and have VALID INSTAGRAM API to BUILD APPLICATION. Below are some examples:
- Simple Application Flow:

> All code is well commented to understand the flow and functionality, if I missed something or
> any improvement/suggestion you have, kindly let me know.. .... [Read More on Wiki](https://github.com/neerajsinghsonu/Instagram-Data-Scraper/wiki)

> (A) - User Input > Account or Hashtag > Request Link > JSON Response > Make Result
> (B) - (A) -> JSON Response -> If Next Page or Has Next Page > User Input > Account or Hashtag > Request Link > JSON Response > Make Result

---

##  :package: Data available in Super Scraper

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
    - Keyword summery, how many times a word used in Posts

---

## Instagram JSON Response Endpoints & Parameters:

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

## For your application 

Use PHP Class, HTML & Core.js to tweak as per your requirement.

You can see a working demo here [Click to See](https://drive.google.com/file/d/0B2Jr4ZrDD_hFbkhLdXRFb0xBQk0/view)

---

##  :wrench: Requirement

> Apache version => 2.4
> PHP version =>5.*
> PHP allow_url_fopen & openssl or cURL enable
> Browser & Off-course internet Connection :)


### PHP Settings:
> A-) allow_url_fopen + openssl extension OR cURL enable


### Apache Settings:
> B-) Enable .htaccess (optional)


## Note

> C-) Rename dev.htaccess to .htaccess (If you are using windows just rename file dev.htaccess to .htaccess. and window will ignore last dot.. )

---

##  :chart_with_upwards_trend: Change logs:


> Committed repo change code version 2.5.3
- Video total view count added at top of bar
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
- Each request is being handled separately; so don't take hiccup if you click some where during the request - Improved
- Pure html file to make easy template to use in PHP or ASP or any language.
- Search tips: '#' to search Hash tags and '@' to search account information
- Use 'Space' to search multiple hash tags and accounts
- Download in Excel available

> Committed repo change code version 2.1
- 8 - Updated Class Instagram
- 9-  Updated JavaScript Code
- 11- Updated Content
- 12- Add MultiCurl feature [Thanks to @Pete Warden][https://github.com/petewarden/ParallelCurl]
- 13- Added Error Handling

> Committed repo change code version 2.0
- 1 - Added data file example
- 2 - Added result php array example
- 3 - Updated nav bar css
- 4 - Update js file and css file and minify files
- 5 - Remove htaccess [re_write apache module] dependencies
- 6 - Added PHP Code to build PHP array
- 7 - Some minor UI changes
`

Feel free to use and enjoy!! & Yes! all feedback's, enhancements are most welcome... 

## Request:
The application is provided free of cost and for learning purpose that how we can scrape a website html source code. It not intended to harm anyone or
any illegal use. Kindly, respect user's privacy and others efforts. Do not try to intent break something. The World is Beautiful More Then We thought :)

## Next Build Development:
#### (Working on next build - Location with Facebook, RSS & Twitter)


## List Of Contributors:
- [Yuzuru Suzuki](https://github.com/YuzuruS)


Thank you all :) :|
