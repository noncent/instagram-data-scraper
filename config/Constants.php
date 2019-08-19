<?php

define('BASE_URL', 'https://www.instagram.com');
define('LOGIN_URL', 'https://www.instagram.com/accounts/login/ajax/');
define('ACCOUNT_PAGE', 'https://www.instagram.com/{username}');
define('MEDIA_LINK', 'https://www.instagram.com/p/{code}');
define('ACCOUNT_MEDIAS', 'https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables={variables}');
define('ACCOUNT_JSON_INFO', 'https://www.instagram.com/{username}/?__a=1');
define('MEDIA_JSON_INFO', 'https://www.instagram.com/p/{code}/?__a=1');
define('MEDIA_JSON_BY_LOCATION_ID', 'https://www.instagram.com/explore/locations/{{facebookLocationId}}/?__a=1&max_id={{maxId}}');
define('MEDIA_JSON_BY_TAG', 'https://www.instagram.com/explore/tags/{tag}/?__a=1&max_id={max_id}');
define('GENERAL_SEARCH', 'https://www.instagram.com/web/search/topsearch/?query={query}');
define('ACCOUNT_JSON_INFO_BY_ID', 'ig_user({userId}){id,username,external_url,full_name,profile_pic_url,biography,followed_by{count},follows{count},media{count},is_private,is_verified}');
define('COMMENTS_BEFORE_COMMENT_ID_BY_CODE', 'https://www.instagram.com/graphql/query/?query_hash=33ba35852cb50da46f5b5e889df7d159&variables={variables}');
define('LAST_LIKES_BY_CODE', 'ig_shortcode({{code}}){likes{nodes{id,user{id,profile_pic_url,username,follows{count},followed_by{count},biography,full_name,media{count},is_private,external_url,is_verified}},page_info}}');
define('LIKES_BY_SHORTCODE', 'https://www.instagram.com/graphql/query/?query_id=17864450716183058&variables={"shortcode":"{{shortcode}}","first":{{count}},"after":"{{likeId}}"}');
define('FOLLOWING_URL', 'https://www.instagram.com/graphql/query/?query_id=17874545323001329&id={{accountId}}&first={{count}}&after={{after}}');
define('FOLLOWERS_URL', 'https://www.instagram.com/graphql/query/?query_id=17851374694183129&id={{accountId}}&first={{count}}&after={{after}}');
define('FOLLOW_URL', 'https://www.instagram.com/web/friendships/{{accountId}}/follow/');
define('UNFOLLOW_URL', 'https://www.instagram.com/web/friendships/{{accountId}}/unfollow/');
define('USER_FEED', 'https://www.instagram.com/graphql/query/?query_id=17861995474116400&fetch_media_item_count=12&fetch_media_item_cursor=&fetch_comment_count=4&fetch_like=10');
define('USER_FEED2', 'https://www.instagram.com/?__a=1');
define('INSTAGRAM_QUERY_URL', 'https://www.instagram.com/query/');
define('INSTAGRAM_CDN_URL', 'https://scontent.cdninstagram.com/');
define('ACCOUNT_JSON_PRIVATE_INFO_BY_ID', 'https://i.instagram.com/api/v1/users/{userId}/info/');
define('LIKE_URL', 'https://www.instagram.com/web/likes/{mediaId}/like/');
define('UNLIKE_URL', 'https://www.instagram.com/web/likes/{mediaId}/unlike/');
define('ADD_COMMENT_URL', 'https://www.instagram.com/web/comments/{mediaId}/add/');
define('DELETE_COMMENT_URL', 'https://www.instagram.com/web/comments/{mediaId}/delete/{commentId}/');
define('ACCOUNT_MEDIAS2', 'https://www.instagram.com/graphql/query/?query_id=17880160963012870&id={{accountId}}&first=10&after=');
// Look alike??
define('URL_SIMILAR', 'https://www.instagram.com/graphql/query/?query_id=17845312237175864&id=4663052');
define('GRAPH_QL_QUERY_URL', 'https://www.instagram.com/graphql/query/?query_id={{queryId}}');
// log filer setting
define('DEBUG', 'developer.log');
