$(document).ready(function() {

    // ---- NAV ---- //
    // Click Toggle
    $('.menu-icon').click(function(e) {
        e.stopPropagation();
        if ($('#drawer').hasClass('grow')) {
            closeNav();
        }
        else {
            openNav();
        }
    });
    $('#drawer').click(function(e) {
        e.stopPropagation();
    });
    $('body').click(function() {
        if ($('#drawer').hasClass('grow')) {
            closeNav();
        }
    })
    // Swipe Toggle
    $(document).hammer().on('swipeleft', function() {
        openNav();
    });
    $(document).hammer().on('swiperight', function() {
        closeNav();
    });
    // Keyboard Toggle
    $('body').keydown(function(e) {
        if (e.keyCode == 39) {
            openNav();
        }
        if (e.keyCode == 37 || e.keyCode == 27) {
            closeNav();
        }
    });

    // Smooth Scrolling
    $('nav .top .menu .item').click(function() {
        var item = $(this).text();
        if (item != 'contact') {
            $("html,body").animate({
                scrollTop: $('#' + item).offset().top
            }, 300);
        }
    });


    // ---- HERO ---- //
    // View Height
    // Sets a static view height that updates on screen resize
    // This prevents screen janking in mobile browsers
    var currentWidth;
    var currentHeight;
    $(document).ready(function() {
        currentHeight = $(window).height();
        currentWidth = $(window).width();
        $('#hero').css('height', currentHeight);
    });
    $(window).resize(function() {
        // Prevents Android from triggering the resize on scroll
        if ($(window).width() != currentWidth) {
            currentHeight = $(window).height();
            currentWidth = $(window).width();
            $('#hero').css('height', currentHeight);
        }
    });

    // Pause Video
    // This pauses the video when it is outside the user's view
    // to help improve overall site performance
    $(document).scroll(function() {
        var windowPosition = $(window).scrollTop();
        if (windowPosition > currentHeight - 50) {
            $('video').get(0).pause();
        }
        else {
            $('video').get(0).play();
        }
    });


    // ---- CONTACT ---- //
    // Open function
    function openContact() {
        $('#contact form').show();
        $('#contact').addClass('open fixed');
        $('#contact .title h3').addClass('flipped');
        $('body').css('overflow-y', 'hidden');    // Temporarily disables scrolling
    }
    // Close function
    function closeContact() {
        $('#contact').removeClass('open');
        $('#contact .title h3').removeClass('flipped');
        $('#contact form').hide();
        setTimeout(function() {
            $('#contact').removeClass('fixed');
            $('body').css('overflow-y', 'auto');  // Re-enables scrolling
        }, 125);
    }

    // Opens the menu when the nav contact button is clicked
    $('#contact-trigger').click(function() {
        closeNav();
        openContact();
    });

    // Toggles contact menu with the title is clicked
    $('#contact .title').click(function() {
        if ($('#contact').hasClass('open')) {
            closeContact();
        }
        else {
            openContact();
        }
    });
    // Closes contact menu when the exit button is clicked
    $('#contact .exit').click(function() {
        closeContact();
    });
    // Keyboard Toggle
    $('body').keydown(function(e) {
        if (e.keyCode == 27) {
            closeContact();
        }
    });

    // Closes the contact menu when the user clicks outside the menu
    $('#contact').click(function(e) {
        e.stopPropagation();
    });
    $('body').click(function() {
        closeContact();
    });

    // Fixes contact button when the user reaches the bottom of the page
    /*$(window).scroll(function() {
     *    if ($(window).scrollTop() + $(window).height() > $(document).height() - 3) {
     *        $('#contact').addClass('fixed');
     *    }
     *});*/
});


// ---- NAV ---- //
function openNav() {
    $('#drawer').addClass('grow');
    $('#main').addClass('shrink');

    // Hides hero content on mobile devices
    if ($(window).width() < 768) {
        $('#hero').find('h1, h3').hide();
        $('#hero').find('.menu-icon .text').text('x');
        $('#hero').find('.menu-icon .icon').hide();
    }
}

function closeNav() {
    $('#drawer').removeClass('grow');
    $('#main').removeClass('shrink');

    // Hides hero content on mobile devices
    if ($(window).width() < 768) {
        $('#hero').find('h1, h3').show();
        $('#hero').find('.menu-icon .text').text('menu');
        $('#hero').find('.menu-icon .icon').show();
    }
}


// ---- DEVICE DETECTION ---- //
function isMobile() {
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    return isMobile;
}
