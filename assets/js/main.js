$(document).ready(function() {

    load();

    // ---- Scroll  ---- //
    $(window).scroll(function() {
        var wScroll = $(this).scrollTop();

        // Parallax
        if (!isMobile()) {
            parallax(wScroll);
            fog(wScroll);
        }
    });


    // ---- Resize ---- //
    $(window).resize(function() {
        setHeight();
        resizeItem();
        fogHeight();

        if (isMobile()) {
            getSwipe();
        }
    });


    // ---- Default ---- //
    setHeight();
    fogHeight();


    // ---- Nav ---- //
    // Click Events
    $('.nav-trigger').click(function() {
        openNav();
    });
    $('.nav .controller').click(function() {
        closeNav();
    });
    $('.nav-dimmer').click(function() {
        closeNav();
    });
    $('.nav .item').click(function() {
        closeNav();
    });

    // Swipe Events
    getSwipe();

    // Keyboard Events
    $('body').keydown(function(e) {
        if (e.keyCode == 39) {
            openNav();
        }
        if (e.keyCode == 37 || e.keyCode == 27) {
            closeNav();
        }
    });

    // Smooth Scrolling
    scrollTo();


    // ---- Hero ---- //
    scrollDown();


    // ---- Portfolio ---- //
    resizeItem();


    // ---- Contact ---- //
    // Prevents click / hover animations until the form is complete
    $('#contact').bind('input', function() {
        var name = $('input[name="name"]').val();
        var email = $('input[name="email"]').val();
        var textarea = $('textarea').val();

        if (name != '' && email != '' && textarea != '') {
            $('input[name="submit"]').click(function(e) {
                e.preventDefault();
            });
        }
        else {
            $('input[name="submit"]').click(function(e) {
                e.preventDefault();
            });
        }
    });

    $('#contact').find('.name, .email, .textarea').hover(
        function() {
            var $this = $(this);
            var content = $(this).find('.mask').next();
            var element = $(this).attr('class');

            if (content.val() == '' &&
                !$('#contact').find('input, textarea').is(':focus')) {
                showTarget(element);
            }
            $('.split').bind('input', function() {
                if (content.val() == '') {
                    hideTarget(element);
                }
                else {
                    showRelated(element);
                }
            });
        },
        function() {
            var content = $(this).find('.mask').next();
            var element = $(this).attr('class');
            if (content.val() == '' && !content.is(':focus')) {
                hideTarget(element);
            }
        }
    );
    // Close
    $('#contact').find('.name, .email, .textarea').focusout(function() {
        var mask = $(this).find('.mask');
        if (mask.next().val() == '') {
            mask.next().removeClass('unslide').addClass('slide');
            mask.removeClass('slide').addClass('unslide');
        }
    });

    // Expands textarea to match content
    $('.textarea').bind('input', function() {
        var container = $('.textarea')
        var textSize = $('textarea')[0].scrollHeight;
        var maxSize = parseInt(container.css('max-height').replace('px',''));

        if (textSize > container.height()) {
            container.animate({
                height: textSize
            }, 75);
        }
        if (textSize > maxSize) {
            $('textarea').css('overflow', 'visible');
        }
        if ($('textarea').val() == '') {
            container.animate({
                height: 150
            }, 75);
        }
    });
});


// ---- Load ---- //
function load() {
    $('head').append('<link rel="stylesheet" href="assets/css/main.css" type="text/css" />');

    if (!isMobile()) {
        $('#about .fog').css('background-image','url(assets/images/backgrounds/fog-opt.png)');
    }

    setTimeout(function() {
        $('#preloader .circle').animate({
            opacity: 0
        }, 500);
    }, 100);

    setTimeout(function() {
        $('#preloader').animate({
            top: '-100%',
            opacity: 0
        }, 750);
    }, 750);

    setTimeout(function() {
        $('#preloader').remove();
        fogHeight();
    }, 1500);

}

// ---- Heights ----- //
// Set Height
// Sets a static view height that updates on screen resize
// This prevents screen janking in mobile browsers
function setHeight() {
    var currentHeight = $(window).height() + 60;
    var currentWidth = $(window).width();

    $('#hero').css({
        height: currentHeight,
        marginTop: '60px'
    });

    /*if (currentHeight > 413) {
     *    $('#contact').css('height', currentHeight);
     *}
     *else {
     *    $('#contact').css('height', 'auto');
     *}*/
}


// ---- Parallax ---- //
function parallax(wScroll) {
    $('.slow').css({
        'transform': 'translate(0px, ' + (wScroll / 5  - 50) + '%)',
        'opacity': 1 - (wScroll / 750)
    });
    $('#hero i').css({
        'opacity': 1 - (wScroll / 250)
    });
}

// ---- Fog ---- //
function fogHeight() {
    var height = $('#about').outerHeight();
    $('#about .fog').css({
        'height': 2*height,
        'width': 2*height
    });
}
function fog(wScroll) {
    var height = $('#about').outerHeight();
    var newScroll = wScroll - $('#about').offset().top;
    var percent = newScroll / height;

    $('#about .fog').css({
        'top': (height - (.5 * height)) - (.5 * percent * height) + 'px',
        'left': ((.3 * height) - height) + (.7 * percent * height) + 'px'
    });
}


// ---- Nav ---- //
function openNav() {
    $('.nav-trigger').stop().animate({opacity: 0}, 200, 'swing');
    $('.nav-dimmer').stop().show().animate({opacity: 1}, 250, 'swing');
    $('.nav').stop().animate({right: '0%'}, 250, 'swing');
}

function closeNav() {
    $('.nav').animate({right: '-100%'}, 150);
    $('.nav-dimmer').animate({opacity: 0 }, 150).delay(150).hide();
    $('.nav-trigger').delay(50).animate({opacity: 1}, 100);
}


// ---- Portfolio ---- //
function resizeItem() {
    var width = $(window).width();
    if (width > 1200) {
        $('#portfolio .item').removeClass('whole half').addClass('third');
    }
    else if (width > 666 && width < 1199) {
        $('#portfolio .item').removeClass('whole third').addClass('half');
    }
    else {
        $('#portfolio .item').removeClass('half third').addClass('whole');
    }
}


// ---- Scrolling ---- //
// Scrolls to targeted page section
function scrollTo() {
    $('.nav .item').click(function() {
        var target = $(this).text();

        $('html, body').animate({
            scrollTop: $('#' + target).offset().top
        }, 500, 'swing');i
    });
}

// Scrolls to next page section
function scrollDown() {
    $('.scroll-down').click(function() {
        var next = $(this).parent().next();

        $('html, body').animate({
            scrollTop: next.offset().top
        }, 500, 'swing');
    });
}

// ---- Contact ---- //
function showTarget(target) {
    var mask = $('#contact ' + '.' + target).find('.mask');
    mask.next().removeClass('slide').addClass('unslide');
    mask.removeClass('unslide').addClass('slide');
};
function showRelated(target) {
    var name = $('#contact .name');
    if (name.find('input').val() != '') {
        name.find('input').removeClass('slide').addClass('unslide');
        name.find('.mask').removeClass('unslide').addClass('slide');
    }
    var email = $('#contact .email');
    if (email.find('input').val() != '') {
        email.find('input').removeClass('slide').addClass('unslide');
        email.find('.mask').removeClass('unslide').addClass('slide');
    }
    $('#contact .mask').next().blur();
}
function hideTarget(target) {
    var mask = $('#contact ' + '.' + target).find('.mask');
    mask.next().removeClass('unslide').addClass('slide');
    mask.removeClass('slide').addClass('unslide');
};

// ---- DEVICE DETECTION ---- //
function getSwipe() {
    if (isMobile()) {
        $(document).hammer().on('swipeleft', function() {
            openNav();
        });
        $(document).hammer().on('swiperight', function() {
            closeNav();
        });
    }
}

function isMobile() {
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    return isMobile;
}
