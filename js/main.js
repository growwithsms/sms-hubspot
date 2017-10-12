/////////////////////////
// Import 3rd Party JS
/////////////////////////

//@prepros-prepend vendor/list.min.js
//@prepros-prepend vendor/flickity.pkgd.min.js
//@prepros-prepend vendor/magnific-popup.js
//@prepros-prepend vendor/jquery.fitvids.js




/////////////////////////
// General
/////////////////////////

// remove no-js from html tag
document.documentElement.className = document.documentElement.className.replace("no-js","js");

/////// Responsive embeds
$(document).ready(function(){
    $('.post-body').fitVids({ customSelector: "iframe[src*='//media1.giphy.com'], iframe[src^='https://giphy.com']" });
});


/////////////////////////
// Mobile Navigation
/////////////////////////

// Toggle Menu
$('.menu-toggle').on('click', function(){
    $('body').toggleClass('show-menu');
});

// Toggle second level navigation
if( $('.menu-toggle').is(':visible') ) {
    $('.off-canvas-menu .hs-menu-wrapper > ul > li.hs-item-has-children > a').click(function() {
        $(this).parent().toggleClass('show-menu');
        return false;
    });
}


/////////////////////////
// XML Modal Site Search
/////////////////////////

// Close overlay
$('.overlay-close').on('click', function(){
   $('body').removeClass('search-activated');
});

// Activate Modal
$('.search-input').on('click', function(e){
    $('#hubspot-cos-site-search ul').empty();
    e.preventDefault();
    // Ajax sitemap
    $.get('/sitemap.xml', function(cos){
        $(cos).find('url').each(function(){
            // function for capitalizing title
            String.prototype.toProperCase = function () {
                return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            };
            // Build individual search result
            var url = $(this).find('loc').text(),
                urlPath = /[^/]*$/.exec(url)[0],
                name = urlPath.replace(/[-_]+/g, ' ').replace(/([\.,;])/g, '$1 ').toProperCase(),
    			html = '<li><a class="cos-name" href="' + url + '">' + name + '</a><span class="cos-url">' + url + '</span></li>';
            // output to DOM
            $('#hubspot-cos-site-search ul').append(html);
        });
        // initialize list.js
        var options = {
            valueNames: [ 'cos-name', 'cos-url' ]
        };
        var sitemapList = new List('hubspot-cos-site-search', options);
        var noItems = $('<li id="no-items-found">No results found</li>');
        sitemapList.on('updated', function(list) {
            if (list.matchingItems.length === 0) {
                $(list.list).append(noItems);
            } else {
                noItems.detach();
            }
        });
    });
    
    // activate modal
    $('body').addClass('search-activated');
    $('.search-results-wrapper .search').focus();

});


/////////////////////////
// Home Page
/////////////////////////
$('.toggle-switch').on('click', function(){
    if( $('#partners').is(':checked') ) {
        $('.client-logos').addClass('hidden');
        $('.partner-logos').removeClass('hidden');
    } else {
        $('.client-logos').removeClass('hidden');
        $('.partner-logos').addClass('hidden');
    }
});

// Latest Resources Module
$('.resource-tab').on('click', function(e) {
    e.preventDefault();
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    var href = $(this).attr('href');
    $(href).addClass("active");
    $(href).removeClass("hidden");
    $(href).siblings().removeClass("active");
    $(href).siblings().addClass("hidden");
});


///////////////////////////////////////
// Website Designs Page
///////////////////////////////////////
$('.website-design-module #desktop').on('click', function(){
    $(this).closest('.website-design-module').find('button#mobile').removeClass('active');
    $(this).closest('.website-design-module').find('.mobile.browser').removeClass('active');
    $(this).addClass('active');
    $(this).closest('.website-design-module').find('.desktop.browser').addClass('active');
});

$('.website-design-module #mobile').on('click', function(){
    $(this).closest('.website-design-module').find('button#desktop').removeClass('active');
    $(this).closest('.website-design-module').find('.desktop.browser').removeClass('active');
    $(this).addClass('active');
    $(this).closest('.website-design-module').find('.mobile.browser').addClass('active');
});

$('.browser-header #close').on('click', function(){
    $(this).closest('.browser').removeClass('minimize expand').toggleClass('close');
});

$('.browser-header #minimize').on('click', function(){
    $(this).closest('.browser').removeClass('close expand').toggleClass('minimize');
});

$('.browser-header #expand').on('click', function(){
    $(this).closest('.browser').removeClass('minimize close').toggleClass('expand');
});


///////////////////////////////////////
// eCommerce N2 Page
///////////////////////////////////////
$('.carousel-content > span').flickity({
    cellSelector: '.hs_cos_wrapper_type_rich_text',
    wrapAround: true,
    cellAlign: 'left',
    pageDots: false,
    imagesLoaded: true
});


///////////////////////////////////////
// About Page 
///////////////////////////////////////
function hoverVideo(e) {
    e.preventDefault();
    $(this).children('video').get(0).play();
    $(this).children('video').on('ended', function(){
        this.currentTime = 0;
        this.pause();
    });
}

if( $('body.about').length ) {
    
    $(".team-member-module").on( "mouseover click", hoverVideo );

    var user_keys = [],
    konami = '38,38,40,40,37,39,37,39,66,65';
    document.onkeydown = function(e){
      user_keys.push(e.keyCode)
      if (user_keys.toString().indexOf(konami) >= 0) {
            
            $("body").addClass("konami");
            
            var luke    = $('#hs_cos_wrapper_widget_1476382266223 video'),
                shawn   = $('#hs_cos_wrapper_widget_1471896125783 video'),
                donna   = $('#hs_cos_wrapper_widget_1471895527145 video'),
                lief    = $('#hs_cos_wrapper_widget_1471895481965 video');
                
            setTimeout(function(){
                luke.get(0).play();
            }, 500);
            
            setTimeout(function(){
                shawn.get(0).play();
            }, 2000);
            
            setTimeout(function(){
                donna.get(0).play();
            }, 4000);
            
            setTimeout(function(){
                lief.get(0).play();
                $('body').addClass('blur-animation');
                setTimeout(function(){
                    $('body').removeClass('blur-animation konami');
                        luke.currentTime = 0;
                        shawn.currentTime = 0;
                        donna.currentTime = 0;
                        lief.currentTime = 0;
                }, 6000);
            }, 5500);
            
            user_keys = [];
        }
    }
    
}


///////////////////////////////////////
// Initialize lightGallery module
///////////////////////////////////////
if( $('.light-gallery-module').length > 0 && $('.hs-inline-edit').length === 0 ) {
    $('.light-gallery-module').unwrap().unwrap().lightGallery();
}


///////////////////////////////////////
// Ebook Landing Page Template
///////////////////////////////////////
if( $('.ebook-landing-page').length ) {
    
    $(window).load(function(){
        // Adds custom color to the form's button
        var buttonColor = $('.button-color').attr('data-button-color');
        $('.sidebar-form .hs-button').css('background-color', buttonColor );
    });
    
}

/////////////////////////////////////////////////////
// Modal Dialog Stuff
////////////////////////////////////////////////////
$('.popup-link').magnificPopup({
    type:'inline',
    midClick: true,
    removalDelay: 200, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = "mfp-zoom-in";
        }
    }
});