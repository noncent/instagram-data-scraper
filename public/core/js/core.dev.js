/**
 * This is global JavaScript file
 *
 * @lastUpdated - 23-August-2019
 *
 * This file contains all global level variable and function which needs to call
 * in separate modular file
 *
 * The superScraper is global variable to get and set JavaScript Application Settings
 *
 * @todo: Code Cleanup, Minimized & Optimizations
 * @version: WIP
 * @author: Neeraj Singh <neerajsinghsonu@gmail.com>
 */
$(window).load(function() {
  $('.se-pre-con').fadeOut('slow');
});
// account filter, where want to search users minimum details or full
const FILTER_MIN = 'account-basic';
const FILTER_FULL = 'account-full';
const MAX_POST_RETURNS = 8;
// var tmpCnt = 0;
// jQuery alias
$ = jQuery;
// jQuery document object
var $document = $(document);
// check if internet connection enable
var is_online = window.navigator.onLine;
// htaccess check
var htaccess = $.trim($('#htaccess').val());
// Export button in table
var $btnExportExcel = $('#btnExport');
// Main top progress bar
var $loadingContainer = $('.progress-bar');
// Total no of Instagram links
var totalRequestUrl = 0;
// Application starting index
var currentMasterIndex = 1;
// Application starting progress value
var currentMasterProgress = 0;
// App debug flag
var logInfo = true;
// Search Flag
var isFilter = false;
// htaccess check
var htaccess = $.trim($('#is_htaccess_enable').val());
// chart flag
var is_chart_created = false;
// top navigation hide
var navBarForm = $('.form-inline');
// modal close
var booClose = $('.close');
// default #hash tag
var keyContainer = ['#digitaslbi'];
// counter
var currentIndex = 0;
// account search filters
var $account_filters = '.account-filters';
// get account max-min setting
var chkOpt = $("input[id='info-toggle']").val();
// insta session input
var instagramSessionInput = $('#insta-session-id-val');
// cookie anme where user going to store instagram session id
var instaCookieName = 'insta-sess-cookie';
// Get the cookie value
var instagramSessionCookie = Cookies.get(instaCookieName);
// custom log function
var applogs = function(anything) {
  console.log(anything);
}
var appinfo = function(anything) {
  console.info(anything);
}
// Config Object Settings
var Config = {
  session_key: instaCookieName,
  // current search action
  action: 'account',
  // get minimum (Link, Biography, Followers, Following) or maximum account information
  infoFullMin: chkOpt,
  // ajax url
  urlRequest: 'includes/AjaxServices.php',
  // user internet connection status
  userAgentStatus: is_online,
  // search button selector
  btnSearch: '#btnSearch',
  // input search text
  txtSearch: '#txtSearch',
  // form input template
  queryFormTemplate: '#query-form-template',
  // account likes posts
  accountThumbPopup: '#account-thumbs',
  // Search Details Section
  searchFormContainer: '#search-form-section',
  // Chart Section
  searchFormChartContainer: '#search-form-chart-section',
  // label:- top navigation indicators selectors
  lblCountSearchAccounts: '#CountSearchAccounts .badge.badge-pill',
  lblCountSearchHashtags: '#CountSearchHashtags .badge.badge-pill',
  lblSumOfVideoViews: '#SumOfVideoViews .badge.badge-pill',
  lblSumOfTotalLikes: '#SumOfTotalLikes .badge.badge-pill',
  lblSumOfTotalComments: '#SumOfTotalComments .badge.badge-pill',
  lblSumOfTotalShare: '#SumOfTotalShare .badge.badge-pill',
  lblSumOfTotalPosts: '#SumOfTotalPosts .badge.badge-pill',
  // canvas js chart template
  chartTemplate: '#chart-template',
  // off line error message if internet off
  offlineMsg: 'WARNING, you are offline or internet connection lost.',
  sessionError: 'Please click on "Set Session" button and paste your Instagram sessionid to search account',
  // label:- top navigation indicators values
  queryAccounts: 1,
  queryHashtags: 1,
  queryLikes: 1,
  queryComments: 1,
  queryKeywords: 1,
  queryPosts: 1,
  // get Config item
  getItem: function(item) {
    if (this[item].toString()) {
      applogs('Item found: ' + item);
      return this[item].toString();
    } else {
      applogs('Item not found: ' + item);
      return false;
    }
  },
  // set Config item
  setItem: function(item, value) {
    applogs('Item request to set: ' + item + ' : ' + value);
    if (this[item].toString()) {
      applogs('Item found and set value: ' + item + ' : ' + value);
      this[item] = value;
    }
  }
};
// function to set account search filer on click button filters
$document.on('click', $account_filters, function() {
  $($account_filters).removeClass('active');
  $(this).addClass('active');
  $("input[id='info-toggle']").val($(this).data('val'));
  Config.setItem('infoFullMin', $(this).data('val'));
  appinfo($(this).data('val'));
});
// Application log method - deprecated
var _l = function(data_object_array) {
  if (logInfo === true) {
    applogs(data_object_array);
  }
};
// check if a json has property
function hasProp(obj, prop) {
  applogs('obj');
  applogs(obj);
  applogs('prop');
  applogs(prop);
  if (obj !== undefined) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  return false;
}
// check if a given string is JSON
function isJSONString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
// application log, print on screen
var log = document.querySelector('#log');
['log', 'warn', 'error'].forEach(function(verb) {
  console[verb] = (function(method, verb, log) {
    return function(text) {
      method(text);
      if (isJSONString(text)) {
        text = JSON.stringify(text, undefined, 2);
      }
      // handle distinguishing between methods any way you'd like
      var msg = document.createElement('pre');
      msg.classList.add(verb);
      msg.textContent = verb + ': ' + text;
      //document.body.appendChild(msg);
      //appinfo(log);
      log.appendChild(msg);
    };
  })(console[verb].bind(console), verb, log);
});
// global ajax error handling
$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
  errStr = '';
  errStr += '<div class="alert alert-danger alert-dismissable">';
  errStr += '  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
  errStr += '  <strong>Request/Response Error: </strong> Something went wrong or response not available.';
  errStr += '</div>';
  $('.error-handling .container-fluid').html(errStr).parent().removeClass('hide');
});
/**
 * Main application progress bar
 *
 * @return {[type]} [description]
 */
var stateProgress = function() {
  // debugger message console
  applogs('currentMasterIndex: ' + currentMasterIndex);
  applogs('currentMasterProgress: ' + currentMasterProgress);
  // update progress bar
  // $loadingContainer.attr({
  // 'aria-valuenow': currentMasterProgress
  // }).attr('style', 'width:' + currentMasterProgress + '%').html('Process
  // Completed ' + currentMasterProgress + '%, Now fetching comments &
  // likes');
};
/**
 * Table to Excel Export data
 *
 * @param {[type]}
 *            elid [description]
 * @return {[type]} [description]
 */
function fnExcelReport(elid) {
  // getting data from our div that contains the HTML table
  var data_type = 'data:application/vnd.ms-excel';
  var table = document.getElementById(elid);
  var tab_text = "<table border='2px'>";
  for (j = 0; j < 1; j++) {
    tab_text += "<tr bgcolor='#87AFC6'>" + table.rows[j].innerHTML + '</tr>';
  }
  for (j = 1; j < table.rows.length; j++) {
    tab_text += '<tr>' + table.rows[j].innerHTML + '</tr>';
  }
  tab_text = tab_text + '</table>';
  // remove if u want links in your table
  tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, '');
  // remove if u want images in your table
  tab_text = tab_text.replace(/<img[^>]*>/gi, '');
  // removes input params
  tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, '');
  return data_type + ', ' + encodeURIComponent(tab_text);
}
/**
 * Main Instagram JavaScript Object
 */
var InstagramAccountSearch = function() {
  this.stateError = false;
  this.txtProgressState = 0;
  this.info = [];
  this.urlInstagram = 'https://www.instagram.com';
  this.urlInstagramNext = null;
  this.InstaJSON = null;
  this.currentIndex = 0;
  this.currentIndexPost = 0;
  this.isSearchingForNext = false;
  this.errorContainer = $('.user-error');
  this.infoContainer = $('.user-info');
  this.tableWrapper = $('#search-account-table');
  this.tableContentWrapper = $('#search-account-table.table-striped tbody');
  this.txtIndicator = $('.txt-progress');
  this.sendRequestUrl = Config.getItem('urlRequest');
  this.infoFullMin = Config.getItem('infoFullMin');
};
appinfo(Config.getItem('infoFullMin'));
/**
 * Get User's account information from Instagram JSON and set in Object Property -
 * account-infomation
 */
InstagramAccountSearch.prototype.setAccount = function() {
  var _this = this;
  // ++++++++++++++++++++++++++++++++++++++
  // get user's personal data from json
  // ++++++++++++++++++++++++++++++++++++++
  this.info = [];
  this.info.Biography = this.InstaJSON.graphql.user.biography;
  this.info.UserName = this.InstaJSON.graphql.user.username;
  this.info.FullName = this.InstaJSON.graphql.user.full_name;
  (this.info.user_id = this.InstaJSON.graphql.user.id), (this.info.Posts = this.InstaJSON.graphql.user.edge_owner_to_timeline_media.count);
  this.info.Followers = this.InstaJSON.graphql.user.edge_followed_by.count;
  this.info.Following = this.InstaJSON.graphql.user.edge_follow.count;
  this.info.AccountHref = this.urlInstagram + '/' + this.InstaJSON.graphql.user.username;
  this.info.Thumbs = [];
};
/**
 * Get User's media information from Instagram JSON and set in Object Property -
 * users account-information
 */
InstagramAccountSearch.prototype.buildAccountTableSummary = function() {
  applogs('Set Media Calling....');
  var _this = this;
  // show label, no of total post / 12
  applogs('No of total POST is, ' + this.info.Posts);
  applogs('Current Index is, ' + this.currentIndexPost);
  applogs('STEP: A currentIndexPost = ' + this.currentIndexPost);
  var userPostIndex = Math.ceil(this.info.Posts / MAX_POST_RETURNS);
  appinfo(this.currentIndexPost + ' - ' + userPostIndex);
  this.eventHandler('Likes & Comments: ' + this.currentIndexPost + '/' + userPostIndex + ', ' + this.info.FullName);
  this.txtProgressState = Math.ceil(this.currentIndexPost * 100) / userPostIndex;
  // if requested full information only then call script
  if (this.infoFullMin === FILTER_FULL) {
    appinfo('Full request access');
    applogs('JSON data is .... ');
    applogs(this.InstaJSON);
    // +++++++++++++++++++++++++++++++++++
    // get users social data from json
    // +++++++++++++++++++++++++++++++++++
    // collectors empty arrays
    var Edges = [];
    var likes = [];
    var comments = [];
    var views = [];
    var likes_sum = 0;
    var comments_sum = 0;
    var views_sum = 0;
    var userJsonData = {};
    applogs('InstaJSON debug data');
    applogs(this.InstaJSON);
    // check if property exist
    if (hasProp(this.InstaJSON, 'graphql') || hasProp(this.InstaJSON, 'data')) {
      applogs('Entering in graphql or data mode');
      if (hasProp(this.InstaJSON.graphql, 'user') || hasProp(this.InstaJSON.data, 'user')) {
        applogs('Entering in user');
        // collectors empty arrays
        if (hasProp(this.InstaJSON.graphql, 'user')) {
          // change json data node
          Edges = this.InstaJSON.graphql.user.edge_owner_to_timeline_media.edges;
          // get thumbnail, comments, likes, views....
          userJsonData = this.InstaJSON.graphql.user;
        } else if (hasProp(this.InstaJSON.data, 'user')) {
          // change json data node
          Edges = this.InstaJSON.data.user.edge_owner_to_timeline_media.edges;
          // get thumbnail, comments, likes, views....
          userJsonData = this.InstaJSON.data.user;
        } else {
          {
            applogs("No data or graphql has user property");
            return false;
          }
        }
        // check if request is full or minimum
        applogs("JSON edge is printing");
        applogs(Edges);
        $.each(Edges, function(index, edge) {
          applogs('Displaying edge');
          applogs(edge);
          _this.info.Thumbs.push({
            'thumb-src': Config.getItem('urlRequest') + '?url=' + encodeURIComponent(edge.node.thumbnail_resources[0].src),
            comments: edge.node.edge_media_to_comment.count,
            likes: edge.node.edge_media_preview_like.count
          });
          likes.push(edge.node.edge_media_preview_like.count);
          comments.push(edge.node.edge_media_to_comment.count);
          views.push(edge.node.video_view_count ? edge.node.video_view_count : 0);
        }); // filters and sum, likes
        $.each(likes, function(k, v) {
          likes_sum += parseInt(v) || 0;
        }); // filter and sum, comments
        $.each(comments, function(k, v) {
          comments_sum += parseInt(v) || 0;
        }); // filter and sum, video views
        $.each(views, function(k, v) {
          views_sum += parseInt(v) || 0;
        });
      }
      applogs('Is Next Calling Value: ' + this.isSearchingForNext);
      // set all values of sum
      if (!this.isSearchingForNext) {
        applogs('likes sum value is: ' + likes_sum);
        this.info.TotalLikes = likes_sum;
        applogs('comments sum value is: ' + comments_sum);
        this.info.TotalComments = comments_sum;
        applogs('views sum value is: ' + views_sum);
        this.info.TotalViews = views_sum;
      } else {
        // add in previous values
        this.info.TotalLikes = parseInt(this.info.TotalLikes) + likes_sum;
        this.info.TotalComments = parseInt(this.info.TotalComments) + comments_sum;
        this.info.TotalViews = parseInt(this.info.TotalViews) + views_sum;
        applogs('Searching for next....');
      }
      // check if next id available to get next result set
      applogs('Check Has Next from JSON: ' + userJsonData.edge_owner_to_timeline_media.page_info.has_next_page);
      if (userJsonData.edge_owner_to_timeline_media.page_info.has_next_page === true) {
        this.urlInstagramNext = userJsonData.edge_owner_to_timeline_media.page_info.end_cursor;
        this.currentIndexPost++;
        applogs('STEP: B ++ currentIndexPost = ' + this.currentIndexPost);
        this.isSearchingForNext = true;
        applogs('Next page is requested');
      } else {
        this.currentIndexPost = 1;
        applogs('STEP: C Reset currentIndexPost = 1');
        this.isSearchingForNext = false;
        applogs('Next page not requested');
      }
      // safe values set fall-back values
      if (typeof this.info.TotalLikes === undefined) {
        this.info.TotalLikes = 0;
      }
      if (typeof this.info.TotalComments === undefined) {
        this.info.TotalComments = 0;
      }
      if (typeof this.info.TotalViews === undefined) {
        this.info.TotalViews = 0;
      }
    }
  }
};
/**
 * Create Table data row with User's information
 *
 * @return {[type]} [description]
 */
InstagramAccountSearch.prototype.buildTableRowsContent = function() {
  var row = '';
  row += '<tr class="info-row">';
  row += '<td><input class="tbl-chk" type="checkbox"></td>';
  row += '<td><a target="_blank" href="' + this.info.AccountHref + '">' + this.info.UserName + '</a></td>';
  row += '<td>' + this.info.Biography + '</td>';
  row += '<td>' + this.info.Followers + '</td>';
  row += '<td>' + this.info.Following + '</td>';
  row += '<td>' + this.info.Posts + '</td>';
  if (this.info.TotalLikes) {
    row += '<td><a href="#" data-toggle="modal" data-target="#thumb-' + this.info.UserName + '">' + this.info.TotalLikes +
      '</a></td>';
  } else {
    row += '<td>0</td>';
  }
  if (this.info.TotalComments) {
    row += '<td>' + this.info.TotalComments + '</td>';
  } else {
    row += '<td>0</td>';
  }
  if (this.info.TotalViews) {
    row += '<td>' + this.info.TotalViews + '</td>';
  } else {
    row += '<td>0</td>';
  }
  row += '<td>';
  row += '<a data-placement="top" data-toggle="tooltip" title="Edit">';
  row +=
    '<button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button>';
  row += '</a> ';
  row += '<a data-placement="top" data-toggle="tooltip" title="Delete">';
  row +=
    '<button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button>';
  row += '</a>';
  row += '</td>';
  row += '</tr>';
  // form template
  var template = $(Config.getItem('accountThumbPopup')).html();
  // optional, speeds up future uses
  Mustache.parse(template);
  // applogs(this.info.Thumbs)
  // set form input with search values
  rendered = Mustache.render(template, {
    username: this.info.UserName,
    'thumb-loop': this.info.Thumbs
  });
  this.tableWrapper.after(rendered);
  return row;
};
/**
 * Instagram wrong link error handler
 *
 * @param {[type]}
 *            errors [description]
 * @return {[type]} [description]
 */
InstagramAccountSearch.prototype.errorHandler = function(errors) {
  this.errorContainer.html(errors);
};
/**
 * Small label indicator success/false/error
 *
 * @param {[type]}
 *            label [description]
 * @param {[type]}
 *            error_class [description]
 * @return {[type]} [description]
 */
InstagramAccountSearch.prototype.eventHandler = function(label, error_class) {
  if (typeof error_class === 'undefined') {
    this.txtIndicator.eq(this.currentIndex).css({
      width: this.txtProgressState + '%',
      'border-top': '2px solid green'
    });
    this.infoContainer.eq(this.currentIndex).html(label);
  } else {
    this.txtIndicator.eq(this.currentIndex).css({
      width: this.txtProgressState + '%',
      'border-top': '2px solid red'
    });
    this.infoContainer.eq(this.currentIndex).removeClass('label-info').addClass(error_class).html(label);
  }
};
/**
 * Start the application script process
 *
 * @param {[type]}
 *            link [description]
 * @return {[type]} [description]
 */
InstagramAccountSearch.prototype.initNow = function(link, _send_payload) {
  // cache main object
  var $this = this;
  applogs('Calling init now');
  var send_payload = _send_payload;
  // set default payload object
  if (!send_payload) {
    send_payload = {
      iUrl: link,
      request_action: 'pull_account',
      // send cookie name
      sessionid: Config.getItem('session_key')
    };
    applogs('Sending payload is:');
    applogs(send_payload);
  }
  // you said promise
  return $.post($this.sendRequestUrl, send_payload, function(data, textStatus, xhr) {
    // set var counter
    applogs('inside ajax request: Searching for Next, ' + $this.isSearchingForNext);
    var masterProgress = 0;
    // if any error in ajax response
    if (window._sharedData && window._sharedData.error) {
      // set error flag
      applogs('JSON has error, terminating process now.');
      $this.stateError = true;
      // show error message
      $this.errorHandler(window._sharedData.error);
      // error percentage
      masterProgress = Math.floor((currentMasterIndex / totalRequestUrl) * 100);
      // get over all percentage
      currentMasterProgress = masterProgress;
      // update master progress bar
      stateProgress();
      // increase master index value
      currentMasterIndex++;
      // break the bone
      return false;
    } else {
      applogs('Success, no ajax error in response');
    }
    // handle success response
    $this.InstaJSON = window._sharedData.entry_data.ProfilePage.shift();
    applogs('This is what response fetched');
    applogs($this.InstaJSON);
    // set error flag false
    $this.stateError = false;
    // check if property exist
    if ($this.InstaJSON.graphql) {
      applogs('graphql found in response');
      // instagram returns graphql on first request then on 2nd request returns data property (check else condition)
      if ($this.InstaJSON.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page === true && $this.infoFullMin == FILTER_FULL) {
        appinfo('Full request access II');
        $this.urlInstagramNext = $this.InstaJSON.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor;
        applogs('STEP: D ++ currentIndexPost = ' + $this.currentIndexPost);
        $this.currentIndexPost++;
        $this.isSearchingForNext = true;
        applogs('Next page is requested graphql: end_cursor - ' + $this.urlInstagramNext);
      } else {
        $this.currentIndexPost = 1;
        applogs('STEP: E Reset currentIndexPost = 1');
        $this.isSearchingForNext = false;
        applogs('STEP: Next page not requested graphql: end_cursor - ' + $this.urlInstagramNext);
      }
    } else if ($this.InstaJSON.data && $this.infoFullMin === FILTER_FULL) {
      appinfo('Full request access III');
      if ($this.InstaJSON.data.user.edge_owner_to_timeline_media.page_info.has_next_page === true) {
        $this.urlInstagramNext = $this.InstaJSON.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
        applogs('STEP: F ++ currentIndexPost = ' + $this.currentIndexPost);
        $this.currentIndexPost++;
        $this.isSearchingForNext = true;
        applogs('Next page is requested data: end_cursor - ' + $this.urlInstagramNext);
      } else {
        applogs('STEP: G Reset currentIndexPost = 1');
        $this.currentIndexPost = 1;
        $this.isSearchingForNext = false;
        applogs('Next page not requested data: end_cursor - ' + $this.urlInstagramNext);
      }
    } else {
      applogs('No data or graphql found');
      return false;
    }
    // $this.InstaJSON.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
    applogs('Requesting action is:' + send_payload.request_action);
    // get/set users data
    if (send_payload.request_action === 'pull_account') {
      // check private account status
      if ($this.InstaJSON.graphql.user.is_private === true) {
        applogs('Requested account is private');
        // update label text
        $this.eventHandler('This is Private account: ' + $this.InstaJSON.graphql.user.full_name, 'label-danger');
        return false;
      }
      applogs('Setting user account with information');
      $this.setAccount();
      // next ajax call
      _send_payload = {
        // send user name with loop next request
        keyword: $this.info.user_id,
        // request filter
        request_action: 'pull_media',
        // send cookie name
        sessionid: Config.getItem('session_key'),
        max_id: $this.urlInstagramNext
      };
      // send ajax request again
      if ($this.infoFullMin === FILTER_FULL) {
        appinfo('Full request access IV');
        applogs('Call ing init now again...with max is and pull media flag');
        $this.initNow($this.info.UserName, _send_payload);
      }
    } else {
      applogs('running else condition')
      $this.buildAccountTableSummary();
      // if next result set found with max id
      if ($this.isSearchingForNext === true && $this.infoFullMin === FILTER_FULL) {
        // next ajax call
        appinfo('Full request access V');
        _send_payload = {
          // send user name with loop next request
          keyword: $this.info.user_id,
          // request filter
          request_action: 'pull_media',
          // next request id
          max_id: $this.urlInstagramNext,
          // send cookie name
          sessionid: Config.getItem('session_key')
        };
        // send ajax request again
        $this.initNow($this.info.UserName, _send_payload);
      } else {
        // increase master index value
        currentMasterIndex++;
        // calculate work status
        masterProgress = Math.floor((currentMasterIndex / totalRequestUrl) * 100);
        // set next request false
        $this.isSearchingForNext = false;
        // reset index post
        applogs('STEP: H Reset currentIndexPost = 1');
        $this.currentIndexPost = 1;
        // set txt progress bar
        $this.txtProgressState = 0;
        // update label text
        $this.eventHandler('Likes & Comments Done...' + $this.info.FullName, 'label-success');
        // debugger message console
        applogs('Current Index ' + $this.currentIndex);
        applogs('totalRequestUrl ' + totalRequestUrl);
        applogs('Current% ' + masterProgress);
        // update master progress bar value
        currentMasterProgress = masterProgress;
        // call progress bar
        stateProgress();
        // show values rows in table
        $this.tableContentWrapper.append($this.buildTableRowsContent());
      }
    }
    /* Start: Hot Fix Patch */
    if ($this.infoFullMin == FILTER_MIN) {
      appinfo('Min request access VI: ' + $this.infoFullMin);
      applogs('Search account is Minimum flag');
      // increase master index value
      currentMasterIndex++;
      // calculate work status
      masterProgress = Math.floor((currentMasterIndex / totalRequestUrl) * 100);
      // set next request false
      $this.isSearchingForNext = false;
      // reset index post
      applogs('STEP: I Reset currentIndexPost = 1');
      $this.currentIndexPost = 1;
      // set txt progress bar
      $this.txtProgressState = 0;
      // update label text
      $this.eventHandler('Likes & Comments Done...' + $this.info.FullName, 'label-success');
      // debugger message console
      applogs('Current Index ' + $this.currentIndex);
      applogs('totalRequestUrl ' + totalRequestUrl);
      applogs('Current% ' + masterProgress);
      // update master progress bar value
      currentMasterProgress = masterProgress;
      // call progress bar
      stateProgress();
      // show values rows in table
      $this.tableContentWrapper.append($this.buildTableRowsContent());
    } else {
      appinfo('Requested info type is: ' + $this.infoFullMin);
      appinfo('Full request access VII');
      applogs('Going in Full Condition and Search for Next is TRUE');
      $this.isSearchingForNext = true;
    }
    /* End: Hot Fix Patch */
  }); /* End: Ajax function */
};
/**
 * This is global JavaScript file
 *
 * This file contains all global level variable and function which needs to call
 * in separate modular file
 *
 * The superScraper is global variable to get and set JavaScript Application Settings
 *
 * @todo: Code Cleanup, Minimized & Optimizations
 * @version: WIP
 * @author: Neeraj Singh <neerajsinghsonu@gmail.com>
 */
$document.ready(function() {
  // on change hidden input val set config
  $("input[id='info-toggle']").on('change', function() {
    chkOpt = $(this).val();
    Config.setItem('infoFullMin', chkOpt);
    //appinfo(Config.getItem('infoFullMin'));
  });
  $(instagramSessionInput).on('change paste keyup', function() {
    applogs('Session value reset: ' + $(this).val());
    Cookies.set(instaCookieName, $(this).val());
  }); // if cookie set then get value
  if (instagramSessionCookie) {
    instagramSessionInput.val(instagramSessionCookie);
  }
  $('[data-toggle=tooltip]').tooltip()
  /**
   * [description]
   *
   * @param {[type]} $
   *            [description]
   * @return {[type]} [description]
   */
  ;
  (function($) {
    $.fn.flash = function(message) {
      if (typeof message === 'undefined') {
        $('.container.preloader').addClass('hide');
      } else {
        $('.container.preloader').removeClass('hide').find('.progress-bar.progress-bar-striped').html(message);
      }
    };
  })(jQuery);
  /**
   * Word Emo Analytic Cloud
   * @type {Array}
   */
  var good = [{
    text: '#Lovely',
    weight: 10
  }, {
    text: '#Good',
    weight: 11
  }, {
    text: '#Excellent',
    weight: 12
  }, {
    text: '#Wowmade',
    weight: 13
  }, {
    text: '#wow',
    weight: 14
  }, {
    text: '#Philadelphia',
    weight: 15
  }, {
    text: '#NewDone',
    weight: 16
  }, {
    text: '#Best',
    weight: 17
  }]; // execute happy
  $('.wow').jQCloud(good, {
    shape: 'elliptic',
    autoResize: true,
    height: 350
  });
  /**
   * Word Emo Analytic Cloud
   * @type {Array}
   */
  var bad = [{
    text: '#SoBad',
    weight: 21
  }, {
    text: '#Nope',
    weight: 22
  }, {
    text: '#DoNotWorks',
    weight: 23
  }, {
    text: '#Useless',
    weight: 24
  }, {
    text: '#SoPoor',
    weight: 25
  }, {
    text: '#AnotherBad',
    weight: 26
  }, {
    text: '#ServiceOff',
    weight: 27
  }, {
    text: '#Ban',
    weight: 28
  }]; // execute bad
  $('.oh').jQCloud(bad, {
    colors: ['#800026', '#bd0026', '#e31a1c', '#fc4e2a', '#fd8d3c'],
    shape: 'elliptic',
    autoResize: true,
    height: 350
  });
  /**
   * Instagram Super Search Object
   * @type {Array}
   */
  var superScraper = function() {};
  /**
   * Internet Connection Status and Template
   */
  superScraper.prototype.setOfflineMode = function() {
    if (this.userAgentStatus === false) {
      var template = $('#offline-template').html();
      $('.wrapper').html(template);
    }
  };
  /**
   * Class download is for download data in excel from table by table
   * id use table id in a tag as data-id attr use same table id in
   * table tag as id attr
   *
   * @return {[type]} [description]
   */
  $(document).on('click', 'a.download', function() {
    applogs('Download triggered....');
    // a tag
    var _this = $(this);
    // table id
    var data = _this.data('id');
    // export to excel
    var elData = fnExcelReport(data);
    // create download button and trigger
    _this.attr('download', 'ExcelExport-' + new Date().getTime() + '.xls').attr('href', elData).attr('target', '_blank');
  });
  // search input type object
  var queryText = $(Config.getItem('txtSearch'));
  // auto complete query text
  queryText.typeahead({
    multiple: true,
    source: keyContainer,
    autoSelect: true,
    minLength: 0,
    items: 20,
    showHintOnFocus: true,
    dupChecker: true
  });
  queryText.change(function() {
    var current = queryText.typeahead('getActive');
    if (current) {
      // Some item from your model is active!
      if (current.name == queryText.val()) {
        // This means the exact match is found. Use
        // toLowerCase() if you want case insensitive match.
      } else {
        // This means it is only a partial match, you can either
        // add a new item
        // or take the active if you don't want new items
      }
    } else { // Nothing is active so it is a new value (or maybe empty
      // value)
    }
  }); // ajax action loader
  $document.ajaxStart(function() {
    $('body').flash('Please wait...request in progress');
  }).ajaxStop(function() {
    $('body').flash();
  });
  /** on modal close */
  booClose.modal('hide');
  /** tool tip code */
  $('body').tooltip({
    selector: '[rel=tooltip]',
    trigger: 'hover'
  });
  /** zoom effect on image post */
  $document.delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });
  // random color for chart
  function hexColor() {
    var hexaPattern = 0xffffff - Math.floor(Math.random() * 0x1000000);
    return '#' + ('000000' + hexaPattern.toString(16)).substr(-6);
  }
  // display the chart
  function showChart(options) {
    var el = 'chart_' + new Date().getTime();
    CanvasJS.addColorSet('customColorSet', [hexColor(), hexColor(), hexColor(), hexColor(), hexColor(), hexColor()]);
    el = new CanvasJS.Chart(options.chartId, {
      animationDuration: 800,
      animationEnabled: true,
      backgroundColor: 'transparent',
      colorSet: 'customColorSet',
      theme: 'theme2',
      legend: {
        fontFamily: 'calibri',
        fontSize: 14,
        horizontalAlign: 'left',
        verticalAlign: 'center',
        itemTextFormatter: function(e) {
          return e.dataPoint.name + ': ' + e.dataPoint.y;
        }
      },
      title: {
        dockInsidePlotArea: true,
        fontSize: 20,
        fontWeight: 'normal',
        horizontalAlign: 'center',
        verticalAlign: 'center',
        text: options.count
      },
      toolTip: {
        cornerRadius: 0,
        fontStyle: 'normal'
      },
      data: [{
        innerRadius: '80%',
        radius: '90%',
        legendMarkerType: 'square',
        showInLegend: true,
        startAngle: 90,
        type: 'doughnut',
        dataPoints: [{
          y: options.likes,
          name: 'Likes'
        }, {
          y: options.comments,
          name: 'Comments'
        }, {
          y: options.keywords,
          name: 'Keywords'
        }, {
          y: options.videos,
          name: 'Video Views'
        }]
      }]
    });
    // render all chart
    el.render();
    // set flag
    is_chart_created = true;
  }
  // chart customization if needed resize
  function customizeCharts(chart) {
    if (typeof chart !== 'undefined') {
      if ($(window).outerWidth() >= 1920) {
        chart.options.legend.fontSize = 14;
        chart.options.legend.horizontalAlign = 'left';
        chart.options.legend.verticalAlign = 'center';
        chart.options.legend.maxWidth = null;
      } else if ($(window).outerWidth() < 1920 && $(window).outerWidth() >= 1200) {
        chart.options.legend.fontSize = 14;
        chart.options.legend.horizontalAlign = 'left';
        chart.options.legend.verticalAlign = 'center';
        chart.options.legend.maxWidth = 140;
      } else if ($(window).outerWidth() < 1200 && $(window).outerWidth() >= 992) {
        chart.options.legend.fontSize = 12;
        chart.options.legend.horizontalAlign = 'center';
        chart.options.legend.verticalAlign = 'top';
        chart.options.legend.maxWidth = null;
      } else if ($(window).outerWidth() < 992) {
        chart.options.legend.fontSize = 14;
        chart.options.legend.horizontalAlign = 'center';
        chart.options.legend.verticalAlign = 'bottom';
        chart.options.legend.maxWidth = null;
      }
      chart.render();
    }
  }
  // collect all words
  function getKeyContainer() {
    keyContainer = keyContainer.filter(onlyUnique);
    return keyContainer;
  }
  // filter keyword by uniqueness
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  // call chart
  function renderAllCharts() {
    if (is_chart_created === true) {
      for (var i = 0; i < allCharts.length; i) {
        customizeCharts(allCharts[i]);
      }
    }
  }
  /**
   * Core & Helper Functions for JavaScript array sum
   */
  $.sum = function($array) {
    var ret = 0;
    $.each($array, function(i, val) {
      ret += val;
    });
    return ret;
  };
  // Instagram Search object
  var InstagramHashTagSearch = function(option) {
    this.filterKeywords = option.filterKeywords;
    this.keyWordsGroupCountValue = [];
    this.container = option.container || false;
    this.keyword = option.keyword || false;
    this.template = option.template || false;
    this.callback = option.callback || false;
    this.viewData = {};
    this.chartOptions = {};
    this.sumOfTotalViews = option.sumOfTotalViews;
    this.sumOfTotalLikes = option.sumOfTotalLikes;
    this.sumOfTotalComments = option.sumOfTotalComments;
    this.sumOfTotalShare = option.sumOfTotalShare;
    this.sumOfTotalPosts = option.sumOfTotalPosts;
    this.src = '';
    this.caption = '';
    this.like = 0;
    this.comment = 0;
    this.videos = 0;
    this.name = '';
    this.count = 0;
    this.tblSummery = [];
    this.keywordSummery = [];
    this.imgSrcTemplate = [];
    this.setIndex = 0;
    this.requestUrl = Config.getItem('urlRequest');
    this.dataJson = {};
    this.isNextOn = false;
    this.sumOfCount = 0;
    this.sumOfLikes = 0;
    this.sumOfViews = 0;
    this.sumOfPosts = 0;
    this.sumOfComments = 0;
    this._self = this;
    this.nextId = false;
    this.maxRequestNo = 4;
    this.requestRecursiveCycle = true;
    this.limitRequest = 0;
    this.action = option.action ? option.action : 'pull_hashtag';
    // return self object
    return this;
  };
  // initialize Instagram Search Object
  InstagramHashTagSearch.prototype.initStart = function() {
    // special to collect this keyword
    var _self = this;
    /** each data normal post */
    return $.post(_self.requestUrl, {
      // send keyword
      keyword: _self.keyword,
      // send next id
      next: _self.nextId,
      // send action filter
      request_action: _self.action
    }, function(json) {
      // if any error in ajax response
      if (typeof window._sharedData === 'undefined' || window._sharedData.hasOwnProperty('error')) {
        // break the bone
        return false;
      } else {
        // handle success response
        json = window._sharedData.entry_data.ProfilePage.shift();
      }
      // store all json data in class property
      applogs(json);
      // json in to local var
      _self.dataJson = json;
      // if next id present in json
      if (_self.dataJson.graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page === true) {
        // set next flag true
        _self.isNextOn = true;
        // get max or next id for next request
        _self.nextId = _self.dataJson.graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor;
      } else {
        // no next request
        _self.isNextOn = false;
      }
      applogs(json);
      // parse the json data
      _self.buildMediaPost(json);
      // parse most popular posts, only for once
      if (_self.limitRequest < 1) {
        // top post media pop up
        _self.buildTopPostMedia(json);
      }
      // next request
      _self.onCallNextRequest();
    });
  };
  // Check if hash tag Exist
  InstagramHashTagSearch.prototype.findHashtags = function findHashtags(searchText) {
    if (!searchText) {
      return [];
    }
    var hash = '#';
    var tag =
      'a-zÀ-ÖØ-öø-ÿĀ-ɏɓ-ɔɖ-ɗəɛɣɨɯɲʉʋʻ̀-ͯḀ-ỿЀ-ӿԀ-ԧⷠ-ⷿꙀ-֑ꚟ-ֿׁ-ׂׄ-ׇׅא-תװ-״﬒-ﬨשׁ-זּטּ-לּמּנּ-סּףּ-פּצּ-ﭏؐ-ؚؠ-ٟٮ-ۓە-ۜ۞-۪ۨ-ۯۺ-ۼۿݐ-ݿࢠࢢ-ࢬࣤ-ࣾﭐ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼ‌ก-ฺเ-๎ᄀ-ᇿ㄰-ㆅꥠ-꥿가-힯ힰ-퟿ﾡ-ￜァ-ヺー-ヾｦ-ﾟｰＡ-Ｚａ-ｚぁ-ゖ゙-ゞ㐀-䶿一-鿿꜀-뜿띀-렟-﨟〃々〻';
    var digit = '0-9０-９';
    var underscore = '_';
    var regexp = new RegExp('(?:^|[^' + tag + digit + underscore + ']+)' + '[' + hash + ']' + '(' + '[' + tag +
      digit + underscore + ']*' + '[' + tag + ']+' + '[' + tag + digit + underscore + ']*' + ')' + '(?![' + hash + tag + digit + underscore + ']+)', 'g');
    result = searchText.match(regexp);
    if (!result) {
      return [];
    }
    res = result.map(function(value) {
      value = value.trim().split('#');
      return '#' + value[1];
    });
    return res;
  };
  // Count Words by Group
  InstagramHashTagSearch.prototype.keyWordsGroupCount = function(arrObj) {
    var _self = this;
    arrObj.forEach(function(item, index) {
      if (_self.keyWordsGroupCountValue[item]) {
        _self.keyWordsGroupCountValue[item].push(1);
      } else {
        _self.keyWordsGroupCountValue[item] = [1];
      }
    });
  };
  // build the template view
  InstagramHashTagSearch.prototype.buildTemplateView = function() {
    var _self = this;
    // dynamic chart name
    var _chart = 'chart-view-' + new Date().getTime();
    // count each keyword occurrence
    this.keyWordsGroupCount(keyContainer);
    // serial no, temp var
    var inc = 1;
    var tmpArr = [];
    // build keyword summery
    Object.keys(this.keyWordsGroupCountValue.sort()).forEach(function(item, index) {
      tmpArr.push({
        name: item,
        val: this.keyWordsGroupCountValue[item].length
      });
    }, this);
    // sort array max to min order
    tmpArr.sort(function(a, b) {
      return b.val - a.val;
    });
    // build keyword summer table
    tmpArr.forEach(function(item, index) {
      _self.keywordSummery.push({
        sno: inc++,
        keyword: item.name,
        key_count: item.val
      });
    }, this);
    // view template value
    this.viewData = {
      container: _chart,
      title: this.name,
      'table-summery': this.tblSummery,
      'key-table-summery': this.keywordSummery,
      'img-thumbs': this.imgSrcTemplate
    };
    // result render
    this.container.append(Mustache.render(this.template, this.viewData));
    // options
    this.chartOptions = {
      chartId: _chart,
      count: this.count,
      likes: this.like,
      videos: this.videos,
      comments: this.comment,
      keywords: Object.keys(this.keyWordsGroupCountValue).length
    };
  };
  // build media top post image
  InstagramHashTagSearch.prototype.buildMediaPost = function(json) {
    var _self = this;
    // tag name
    _self.name = json.graphql.hashtag.name;
    // no of total posts
    _self.count = json.graphql.hashtag.edge_hashtag_to_media.count;
    // sum of all posts on each click
    _self.sumOfCount += parseInt(_self.count) || 0;
    // get result media
    $.each(json.graphql.hashtag.edge_hashtag_to_media.edges, function(index, val) {
      // image path
      _self.src = val.node.thumbnail_src;
      // post text
      _self.caption = 'N/A';
      // check if caption exists
      if (val.node.edge_media_to_caption.edges.length) {
        _self.caption = val.node.edge_media_to_caption.edges[0].node.text;
      }
      // comment text
      _self.comment += parseInt(val.node.edge_media_to_comment.count) || 0;
      // video type post, how many post has video
      // if (val.node.is_video === true) {
      // _self.videos =
      // parseInt(val.node.video_view_count) || 0;
      // }
      // sum of like
      _self.like += parseInt(val.node.edge_liked_by.count) || 0;
      // collect all keywords
      _self.findHashtags(_self.caption).forEach(function(hashtag) {
        // if(_self.filterKeywords.indexOf(hashtag)
        // === -1){
        _self.filterKeywords.push(hashtag); // }
      }, this);
    });
  }; // build top media comments
  InstagramHashTagSearch.prototype.buildTopPostMedia = function(json) {
    var _self = this;
    // get result top
    $.each(json.graphql.hashtag.edge_hashtag_to_top_posts.edges, function(index, val) {
      // table row no
      var sr = index + 1;
      // image path
      _self.src = val.node.thumbnail_src;
      // post text
      _self.caption = 'N/A';
      // check if caption exists
      if (val.node.edge_media_to_caption.edges.length) {
        _self.caption = val.node.edge_media_to_caption.edges[0].node.text;
      }
      // comment text
      _self.comment += parseInt(val.node.edge_media_to_comment.count) || 0;
      // video views
      if (val.node.is_video === true) {
        _self.videos += parseInt(val.node.video_view_count) || 0;
        _self.sumOfViews += parseInt(val.node.video_view_count) || 0;
      }
      // sum of like
      _self.like += parseInt(val.node.edge_liked_by.count) || 0;
      // collect all keywords
      _self.findHashtags(_self.caption).forEach(function(hashtag) {
        // if(_self.filterKeywords.indexOf(hashtag)
        // === -1){
        _self.filterKeywords.push(hashtag); // }
      }, this);
      // is video
      if (val.node.is_video === true) {
        // img preview gallery
        _self.imgSrcTemplate.push({
          img_src: Config.getItem('urlRequest') + '?url=' + encodeURIComponent(_self.src),
          likes_img: val.node.edge_liked_by.count,
          comments_img: val.node.edge_media_to_comment.count,
          video_views: parseInt(val.node.video_view_count) ||
            0
        });
      } else {
        // img preview gallery
        _self.imgSrcTemplate.push({
          img_src: Config.getItem('urlRequest') + '?url=' + encodeURIComponent(val.node.thumbnail_src),
          likes_img: val.node.edge_liked_by.count,
          comments_img: val.node.edge_media_to_comment.count
        });
      }
      // build table summer, account information
      _self.tblSummery.push({
        no: sr,
        posts: _self.caption,
        likes_count: val.node.edge_liked_by.count,
        comments_count: val.node.edge_media_to_comment.count
      });
    });
  }; // set top navigation counters
  InstagramHashTagSearch.prototype.buildSummarizeCount = function(elOptions) {
    // get all videos view count
    // this.sumOfViews = this.sumOfViews;
    // get all likes count
    this.sumOfLikes += this.like;
    // get all comment count
    this.sumOfComments += this.comment;
    // get all posts count
    this.sumOfCount += this.count;
    // get all posts count
    this.sumOfPosts += this.count;
    // update top summery section with grand counts, show all sum
    // value in top bar
    this.sumOfTotalViews.text(parseInt(this.sumOfTotalViews.text()) + this.sumOfViews);
    this.sumOfTotalLikes.text(parseInt(this.sumOfTotalLikes.text()) + this.sumOfLikes);
    this.sumOfTotalComments.text(parseInt(this.sumOfTotalComments.text()) + this.sumOfComments);
    this.sumOfTotalShare.text(parseInt(this.sumOfTotalShare.text()) + Object.keys(this.keyWordsGroupCountValue).length);
    this.sumOfTotalPosts.text(parseInt(this.sumOfTotalPosts.text()) + this.sumOfPosts);
  }; // next request call
  InstagramHashTagSearch.prototype.onCallNextRequest = function() {
    // special to collect this keyword
    var _self = this;
    // set limit
    _self.limitRequest++;
    // if next is on
    if (_self.isNextOn && _self.requestRecursiveCycle && _self.limitRequest < _self.maxRequestNo) {
      // call next request
      _self.initStart();
    } else {
      // template data settings
      _self.buildTemplateView();
      // finally call the output
      _self.buildSummarizeCount();
      // render callback/chart
      _self.callback(_self.chartOptions);
    }
  }; // APP Instance
  var APP = new superScraper();
  // Cache values
  var hashtagsValues = parseInt(Config.getItem('queryHashtags')) - 1;
  var accountsValues = parseInt(Config.getItem('queryAccounts')) - 1;
  // on key press enter on text search box
  $(Config.getItem('txtSearch')).on('keypress', function(event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == '13') {
      event.preventDefault();
      $(Config.getItem('btnSearch')).trigger('click');
    }
  }); // Click search button
  $(Config.getItem('btnSearch')).click(function(e) {
    // check if user share their instagram session
    applogs('Btn Search Clicked');
    // connections
    if (!is_online) {
      alert(Config.getItem('offlineMsg'));
      return false;
    }
    // id, if cookie not set and user entered session
    let userInstagramSessionId = $.trim(instagramSessionInput.val());
    // value
    if (!instagramSessionCookie && userInstagramSessionId) {
      applogs('Cookie set as: ' + instaCookieName + ' & value: ' + Cookies.get(instaCookieName));
      // value, create a new cookie and store session
      Cookies.set(instaCookieName, userInstagramSessionId);
    }
    // form template
    var template = $(Config.getItem('queryFormTemplate')).html();
    // optional, speeds up future uses
    applogs('Template ready: ' + template);
    // text result container
    Mustache.parse(template);
    var txtContainer = $(Config.getItem('searchFormContainer'));
    // search text
    var searchQuery = $(Config.getItem('txtSearch')).val();
    applogs('Search Query listed here: ' + searchQuery);
    // if not empty
    if (searchQuery) {
      applogs('Search Query not empty');
      var instanceOfSuperScraper = new superScraper();
      // split search text with space to make array
      var tagListArray = searchQuery.split(' ');
      var elIndex = 0;
      var rendered;
      // for each search item
      $.each(tagListArray, function(i, val) {
        // i = index, val = value
        applogs('Parsing and finding search value type');
        // =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  =
        // search hashtag search
        // =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  =
        // for hash tags, check if value is hastag
        if (tagListArray[i].indexOf('#') === 0) {
          applogs('its a hashtag value: ' + val);
          // set form input
          if (!$(".form-control.insta-url[value='" + val + "']").length) {
            // with search values
            rendered = Mustache.render(template, {
              action: 'hashtag',
              value: val,
              indicator: 'txt-progress-none',
              input_action: 'txt-insta-none',
              user_indicator: 'user-info-none'
            });
            // append view
          }
          txtContainer.append(rendered);
          // count hash tag
          hashtagsValues++;
          // object settings
          var option = {
            filterKeywords: keyContainer,
            sumOfTotalViews: $(Config.getItem('lblSumOfVideoViews')),
            sumOfTotalLikes: $(Config.getItem('lblSumOfTotalLikes')),
            sumOfTotalComments: $(Config.getItem('lblSumOfTotalComments')),
            sumOfTotalShare: $(Config.getItem('lblSumOfTotalShare')),
            sumOfTotalPosts: $(Config.getItem('lblSumOfTotalPosts')),
            container: $(Config.getItem('searchFormChartContainer')),
            keyword: val.replace('#', '') || 'digitaslbi',
            template: $(Config.getItem('chartTemplate')).html(),
            action: 'pull_hashtag',
            callback: showChart
          };
          // start fetching...
          var InstaObject = new InstagramHashTagSearch(option).initStart();
        }
        // =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  =
        // search users account
        // =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  = =  =  =
        if (tagListArray[i].indexOf('@') === 0) {
          applogs('its a user handle value: ' + val);
          if (Cookies.get(instaCookieName)) {
            // set form
            // input with earch values
            if (!$(".form-control.insta-url[value='" + val + "']").length) {
              rendered = Mustache.render(template, {
                action: 'instagram',
                value: val,
                indicator: 'txt-progress',
                input_action: 'txt-insta',
                user_indicator: 'user-info'
              });
            }
          }
          // append view
          txtContainer.append(rendered);
          accountsValues++;
          // check if valid session exists
          if (Cookies.get(instaCookieName)) {
            // request for filter
            if ($.trim(val)) {
              val = val.replace(/\@/, '', val);
              // set filter flag
              isFilter = true;
              // new Object Instagram, User Account Search
              var accountSearch = new InstagramAccountSearch();
              // set internal index
              accountSearch.currentIndex = elIndex;
              // update label blue info
              accountSearch.eventHandler('Fetching data, please wait....');
              // call Instagram object
              accountSearch.initNow(null, {
                keyword: val,
                request_action: 'pull_account',
                next: 'false',
                sessionid: Config.getItem('session_key')
              }).done(function(data) {
                if (!accountSearch.stateError) {
                  // promise action can be done here
                } else {
                  // reset index post master
                  applogs('STEP: J Reset currentIndexPost = 1');
                  accountSearch.currentIndexPost = 1;
                  // if any error
                  accountSearch.eventHandler('Error in Instagram profile link, wrong link', 'label-danger');
                }
              });
            }
          } else {
           bootbox.alert(Config.getItem('sessionError'));          }
          elIndex++;
        }
      });
      // update labels
      Config.setItem('queryHashtags', hashtagsValues);
      // update labels
      Config.setItem('queryAccounts', accountsValues);
      // update search numbers
      $(Config.getItem('lblCountSearchHashtags')).html(hashtagsValues);
      $(Config.getItem('lblCountSearchAccounts')).html(accountsValues);
    }
  });
});
