/**
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * Kindly respect other People
 * Every thing is Respectful in Nature... :)
 * Be Good and spend life  happily.....
 *  _        _______  _______  _______  _______ _________   _______ _________ _        _______          
 * ( (    /|(  ____ \(  ____ \(  ____ )(  ___  )\__    _/  (  ____ \\__   __/( (    /|(  ____ \|\     /|
 * |  \  ( || (    \/| (    \/| (    )|| (   ) |   )  (    | (    \/   ) (   |  \  ( || (    \/| )   ( |
 * |   \ | || (__    | (__    | (____)|| (___) |   |  |    | (_____    | |   |   \ | || |      | (___) |
 * | (\ \) ||  __)   |  __)   |     __)|  ___  |   |  |    (_____  )   | |   | (\ \) || | ____ |  ___  |
 * | | \   || (      | (      | (\ (   | (   ) |   |  |          ) |   | |   | | \   || | \_  )| (   ) |
 * | )  \  || (____/\| (____/\| ) \ \__| )   ( ||\_)  )    /\____) |___) (___| )  \  || (___) || )   ( |
 * |/    )_)(_______/(_______/|/   \__/|/     \|(____/     \_______)\_______/|/    )_)(_______)|/     \|
 *                                                                                                    
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

// jQuery alias
$ = jQuery;
// jQuery document object
var $document = $(document);
// on page load hide indicator
var $loading = $('#indicator').hide();
// All button elements
var $btns = $('button');
// Add more button
var $btnAddMore = $('.add-more');
// Get info button
var $btnStartNow = $("#fetch-insta-btn");
// Remove row button
var $btnDeleteNow = $(".remove");
// Start demo button
var $btnStartDemo = $("#startDemo");
// New row html data
var $coneNewurlent = $(".clone").html();
// Clone html wrapper class
var $coneurlentWrapper = $('.row.extra');
// Small success label
var $topNavigeationBar = $(".nav.navbar-nav .label-success");
// Checkbox element
var $inputSelectCheckbox = $(".checkbox-toggle");
// Delete button in table
var $btnTableDel = $("#tbl-del-row");
// Refresh button in table
var $tblReferesh = $("#tbl-refresh");
// Export button in table
var $btnExportExcel = $("#btnExport");
// Main top progress bar
var $loadingContainer = $('.progress-bar');
// Title label
var $modelTitle = $(".modal-title");
// Form html input
var $form = $('form');
// Total no of Instagram links
var totalRequestUrl = 0;
// Application starting index
var currentMasterIndex = 1;
// Application starting progress value
var currentMasterProgress = 0;
// App debug flag
var logInfo = false;
// Application log method
var log_message = function(data_object_array) {
        if (logInfo === true) {
            console.log(data_object_array);
        }
    }
    /**
     * Main application progress bar
     * @return {[type]} [description]
     */
var stateProgress = function() {
    log_message('currentMasterIndex: ' + currentMasterIndex);
    log_message('currentMasterProgress: ' + currentMasterProgress);
    $loadingContainer.attr({
        'aria-valuenow': currentMasterProgress
    }).attr('style', 'width:' + currentMasterProgress + '%').html('&nbsp;&nbsp;&nbsp;Process Completed ' + currentMasterProgress + '%, Now fetching comments & likes');
};
/**
 * Table to Excel Export data
 * @param  {[type]} elid [description]
 * @return {[type]}      [description]
 */
function fnExcelReport(elid) {
    //getting data from our div that contains the HTML table
    var data_type = 'data:application/vnd.ms-excel';
    var table = document.getElementById(elid);
    var tab_text = "<table border='2px'>";
    for (j = 0; j < 1; j++) {
        tab_text += "<tr bgcolor='#87AFC6'>" + table.rows[j].innerHTML + "</tr>";
    }
    for (j = 1; j < table.rows.length; j++) {
        tab_text += "<tr>" + table.rows[j].innerHTML + "</tr>";
    }
    tab_text = tab_text + "</table>";
    //remove if u want links in your table
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");
    // remove if u want images in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, "");
    // removes input params
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");
    return data_type + ', ' + encodeURIComponent(tab_text);
}
/**
 * Main Instagram JavaScript Object
 */
var Instagram = function() {
    this.stateError = false;
    this.txtProgressState = 0;
    this.info = [];
    this.urlInstagram = "https://www.instagram.com";
    this.urlInstagramNext = null;
    this.InstagramJSON = null;
    this.currentIndex = 0;
    this.currentIndexPost = 0;
    this.isSearchingForNext = false;
    this.errorContainer = $(".user-error");
    this.infoContainer = $(".user-info");
    this.tableWrapper = $(".table-data");
    this.tableContentWrapper = $(".table.table-hover.table-striped tbody");
    this.scriptContainer = $("#X-Parser");
    this.txtIndicator = $('.txt-progress');
    this.sendRequestUrl = (!$is_htaccess_enable) ? "Services/AjaxServices.php" : "Instagram/fetch_data";
};
/**
 * Get User's account information from
 * Instagram JSON and set in Object Property
 */
Instagram.prototype.setAccount = function() {
    // ++++++++++++++++++++++++++++++++++++++
    // get user's personal data from json
    // ++++++++++++++++++++++++++++++++++++++
    if (this.isSearchingForNext === false) {
        this.info = [];
        this.info.Biography = this.InstagramJSON.user.biography;
        this.info.UserName = this.InstagramJSON.user.username;
        this.info.FullName = this.InstagramJSON.user.full_name;
        this.info.Posts = this.InstagramJSON.user.media.count;
        this.info.Followers = this.InstagramJSON.user.followed_by.count;
        this.info.Following = this.InstagramJSON.user.follows.count;
        this.info.AccountHref = this.urlInstagram + '/' + this.InstagramJSON.user.username;
    }
    // show label
    var post_index = Math.ceil(this.info.Posts / 12);
    this.eventHandler("Likes & Comments: " + this.currentIndexPost + "/" + post_index + ", " + this.info.FullName);
    this.txtProgressState = Math.ceil(this.currentIndexPost * 100) / post_index;
    // +++++++++++++++++++++++++++++++++++
    // get users social data from json
    // +++++++++++++++++++++++++++++++++++
    // collectors empty arrays
    var Nodes = this.InstagramJSON.user.media.nodes;
    var likes = [],
        comments = [],
        views = [];
    var likes_sum = 0,
        comments_sum = 0,
        views_sum = 0;
    // setters
    $.each(Nodes, function(index, node) {
        likes.push(node.likes.count);
        comments.push(node.comments.count);
        views.push((node.video_views) ? node.video_views : 0);
    });
    // filters and sum, likes
    $.each(likes, function() {
        likes_sum += parseInt(this) || 0;
    });
    // comments
    $.each(comments, function() {
        comments_sum += parseInt(this) || 0;
    });
    // video views
    $.each(views, function() {
        views_sum += parseInt(this) || 0;
    });
    // set all values of sum
    if (this.isSearchingForNext === false) {
        this.info.TotalLikes = likes_sum;
        this.info.TotalComments = comments_sum;
        this.info.TotalViews = views_sum;
    } else {
        // add in previous values
        this.info.TotalLikes = parseInt(this.info.TotalLikes) + likes_sum;
        this.info.TotalComments = parseInt(this.info.TotalComments) + comments_sum;
        this.info.TotalViews = parseInt(this.info.TotalViews) + views_sum;
    }
    // check if next id available to get next result set
    if (this.InstagramJSON.user.media.page_info.has_next_page === true) {
        this.urlInstagramNext = this.urlInstagram + "/" + this.info.UserName + "/?max_id=" + (Nodes[Nodes.length - 1].id);
        this.currentIndexPost += 1;
        this.isSearchingForNext = true;
    } else {
        this.currentIndexPost = 1;
        this.isSearchingForNext = false;
    }
};
/**
 * Create Table data row with User's information
 * @return {[type]} [description]
 */
Instagram.prototype.buildViews = function() {
    var row = '';
    row += '<tr class="info-row">';
    row += '<td><input class="tbl-chk" type="checkbox"></td>';
    row += '<td>' + this.info.AccountHref + '</td>';
    row += '<td>' + this.info.UserName + '</td>';
    row += '<td>' + this.info.Biography + '</td>';
    row += '<td>' + this.info.Followers + '</td>';
    row += '<td>' + this.info.Following + '</td>';
    row += '<td>' + this.info.Posts + '</td>';
    row += '<td>' + this.info.TotalLikes + '</td>';
    row += '<td>' + this.info.TotalComments + '</td>';
    row += '<td>' + this.info.TotalViews + '</td>';
    row += '</tr>';
    return row;
};
/**
 * Instagram wrong link error handler
 * @param  {[type]} errors [description]
 * @return {[type]}        [description]
 */
Instagram.prototype.errorHandler = function(errors) {
    this.errorContainer.html(errors);
};
/**
 * Small label indicator success/false/error
 * @param  {[type]} label       [description]
 * @param  {[type]} error_class [description]
 * @return {[type]}             [description]
 */
Instagram.prototype.eventHandler = function(label, error_class) {
    if (typeof error_class == 'undefined') {
        this.txtIndicator.eq(this.currentIndex).css({
            'width': this.txtProgressState + '%',
            'border-top': '2px solid green'
        });
        this.infoContainer.eq(this.currentIndex).html(label);
    } else {
        this.txtIndicator.eq(this.currentIndex).css({
            'width': this.txtProgressState + '%',
            'border-top': '2px solid red'
        });
        this.infoContainer.eq(this.currentIndex).addClass(error_class).html(label);
    }
};
/**
 * Abandoned for now...
 * @return {[type]} [description]
 */
Instagram.prototype.getAccount = function() {
    // body...
};
/**
 * Start the application script process
 * @param  {[type]} link [description]
 * @return {[type]}      [description]
 */
Instagram.prototype.initNow = function(link) {
    // cache main object
    var $this = this;
    // you said promise
    return $.post($this.sendRequestUrl, {
        iUrl: link
    }, function(data, textStatus, xhr) {
        $this.scriptContainer.html(data);
        eval($this.scriptContainer.html());
        // if any error in ajax response
        if (window._sharedData.error) {
            // set error flag
            $this.stateError = true;
            // show error message
            $this.errorHandler(window._sharedData.error);
            // break the bone
            return false;
        }
        // handle success response
        else {
            $this.InstagramJSON = window._sharedData.entry_data.ProfilePage.shift();
            // set error flag false
            $this.stateError = false;
            // get/set users data
            $this.setAccount();
            // if next result set found with max id
            if ($this.isSearchingForNext === true) {
                // next ajax call
                $this.initNow($this.urlInstagramNext);
            } else {
                currentMasterIndex++;
                var done_so_far = Math.floor(((currentMasterIndex) / (totalRequestUrl)) * 100);
                $this.isSearchingForNext = false;
                $this.currentIndexPost = 1;
                $this.txtProgressState = 0;
                $this.eventHandler("Likes & Comments Done..." + $this.info.FullName);
                log_message('Current Index ' + $this.currentIndex);
                log_message('totalRequestUrl ' + totalRequestUrl);
                log_message('Current% ' + done_so_far);
                currentMasterProgress = done_so_far;
                stateProgress();
                $this.tableContentWrapper.append($this.buildViews());
            }
        }
    });
};
// jQuery DOM ready function
$(document).ready(function() {

    /**
     * This object controls the nav bar. Implement the add and remove
     * action over the elements of the nav bar that we want to change.
     *
     * @type {{flagAdd: boolean, elements: string[], add: Function, remove: Function}}
     */
    var myNavBar = {
        flagAdd: true,
        elements: [],
        init: function(elements) {
            this.elements = elements;
        },
        add: function() {
            if (this.flagAdd) {
                for (var i = 0; i < this.elements.length; i++) {
                    document.getElementById(this.elements[i]).className += " fixed-theme";
                }
                this.flagAdd = false;
            }
        },
        remove: function() {
            for (var i = 0; i < this.elements.length; i++) {
                document.getElementById(this.elements[i]).className = document.getElementById(this.elements[i]).className.replace(/(?:^|\s)fixed-theme(?!\S)/g, '');
            }
            this.flagAdd = true;
        }
    };
    /**
     * Init the object. Pass the object the array of elements
     * that we want to change when the scroll goes down
     */
    myNavBar.init(["top_nav"]);
    /**
     * Function that manage the direction
     * of the scroll
     */
    function offSetManager() {
        var yOffset = 0;
        var currYOffSet = window.pageYOffset;
        if (yOffset < currYOffSet) {
            myNavBar.add();
        } else if (currYOffSet == yOffset) {
            myNavBar.remove();
        }
    }
    /**
     * bind to the document scroll detection
     */
    window.onscroll = function(e) {
            offSetManager();
        }
        /**
         * We have to do a first detection of offset because the page
         * could be load with scroll down set.
         */
    offSetManager();

    // bind ajax loader
    $(document).ajaxStart(function() {
        $loading.show();
        $btns.prop('disabled', true);
        $tblReferesh.addClass('faa-spin animated');
        $modelTitle.html("We are working so hard, don't break the chain...");
        $(".label-success").removeClass('label-success').addClass('label-info');
    }).ajaxStop(function() {
        $loading.hide();
        $btns.prop('disabled', false);
        $tblReferesh.removeClass('faa-spin animated');
        $modelTitle.html("Enter Instagram account url:");
        $(".label-info").removeClass('label-info').addClass('label-success');
    });
    // update counter function
    var updateCounterLink = function() {
            $topNavigeationBar.html($(".insta-url:visible").length);
        }
        // update link count
    updateCounterLink();
    // table top head checkbox toggle
    $inputSelectCheckbox.bind('click', function() {
        var i = $(this).find('i');
        if (i.hasClass('glyphicon-unchecked')) {
            i.removeClass('glyphicon-unchecked').addClass('glyphicon-check');
            $('.tbl-chk').prop('checked', true);
        } else {
            i.removeClass('glyphicon-check').addClass('glyphicon-unchecked');
            $('.tbl-chk').prop('checked', false);
        }
    });
    // export button
    $btnExportExcel.click(function(e) {
        var data = fnExcelReport('export-report');
        $(this).attr('download', 'ExcelExport.xls').attr('href', data).attr('target', '_blank');
    });
    // demo button
    $btnStartDemo.bind('click', function(e) {
        e.preventDefault();
        alert("Now you can click on [Get Info] button to see, How this works..");
        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?start_demo=1";
    });
    // add more button
    $btnAddMore.bind('click', function(e) {
        e.preventDefault();
        $($coneNewurlent).appendTo($coneurlentWrapper);
        updateCounterLink();
    });
    // delete button
    $btnDeleteNow.bind('click', function(e) {
        e.preventDefault();
        $form.find('input:checkbox.chk-input:checked').parents('.col-md-4').remove();
        updateCounterLink();
    });
    // start fetch button
    $btnStartNow.bind('click', function(e) {
        e.preventDefault();
        totalRequestUrl = $("input[name='iUrl[]']:visible").length;
        $topNavigeationBar.html($(".insta-url:visible").length);
        var InstagramUrls = $("input[name='iUrl[]']:visible").map(function(index) {
            var appHandler = new Instagram();
            appHandler.currentIndex = index;
            appHandler.eventHandler("Getting data, please wait....");
            appHandler.initNow($(this).val()).done(function(data) {
                if (!appHandler.stateError) {
                    // promise action can be done here
                } else {
                    appHandler.currentIndexPost = 1;
                    appHandler.eventHandler("Error in Instagram profile link, wrong link", "label-danger");
                }
            });
        });
    });
    // table del button
    $btnTableDel.bind('click', function() {
        alert('Uh! You are bad, Why you hit me :(');
    });
});
