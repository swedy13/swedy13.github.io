// Imports
var hero = './hero.js';

// Global dimensions
var height = $(window).height() + 5;
var unitHeight = parseInt(height) + 'px';
var width = $(window).width() + 5;
var unitWidth = parseInt(width) + 'px';


$(document).ready(function() {
				// Preloader
				preloader();

				// Animations (duration)
				risingWave(4500);
				textWave(150);
    setTimeout(function() {
				    textWave(150);
    }, 2000);

				// Hero Methods
				hero();
				drawer();

    if (!isMobile()) {
        $(window).scroll(function() {
				        var fadeDistance = $(window).height() / 2;
				        var fadePercent = $(window).scrollTop() / fadeDistance;

				        if ($(fadePercent < 2)) {
								        $('.fadeout').animate({
												        paddingTop: 400*fadePercent,
												        opacity: 1.75-fadePercent,
								        }, 1);
				        }
        });
    }

				scaleVideoContainer();
				initBannerVideoSize('.video-container .poster img');
				initBannerVideoSize('.video-container .filter');
				initBannerVideoSize('.video-container video');

				$(window).resize(function() {
								scaleVideoContainer();
								scaleBannerVideoSize('.video-container .poster img');
								scaleBannerVideoSize('.video-container .filter');
								scaleBannerVideoSize('.video-container video');
				});


				// ---- VIDEO UX ---- //
				// Pauses the video when not on screen
				$(window).scroll(function() {
								if (($('#hero').height() - $(window).scrollTop()) < 10) {
												$('#hero-video').get(0).pause();
												return;
								}
								$('#hero-video').get(0).play();
				});

				// Pauses the video when the user is in a different tab/program
				$(window).blur(function() {
								$('#hero-video').get(0).pause();
				});

				$(window).focus(function() {
								if (($('#hero').height() - $(window).scrollTop()) > 10) {
												$('#hero-video').get(0).play();
								}
				});


    // ---- NAVIGATION ---- //
    $('#drawer .menu .item').click(function() {
        var target = '#' + $(this).text();
        var position;
        if (target == '#about') {
            position = $('#hero').offset().top;
        }
        else {
            position = $(target).offset().top;
        }

        $('body,html').animate({
							     scrollTop: position
							 }, 500);
    });


				// ---- SERVICES ---- //
				var service = $('#services').find('.ghost.button');
				service.map(function(i) {
								var colors = ["burlywood",	"cadetblue", "cornflowerblue", "darkseagreen",	"khaki",	"lightcoral",	"lightgreen",	"lightsalmon",	"lightskyblue",	"lightsteelblue",	"thistle"];
								var randomize = Math.floor(Math.random() * colors.length);
								var colorize = colors[randomize];
								$(this).addClass(colorize);
				});


				// ---- PORTFOLIO ---- //
				var portfolioTop = $('#services').offset().top + $('#services').height();
				$('#portfolio').css('top', portfolioTop + 'px');

    // Animates portfolio cards into display
				$(window).scroll(function() {
								var scrollBot = $(window).scrollTop() + $(window).height();
								var scrollPos = ($(window).scrollTop() + $('#services').height()) / portfolioTop;

								if (scrollPos > 1) {
												$('.company').each(function(i) {
																setTimeout(function() {
																				$('.fadeInLeft').eq(i).animate({
																								marginLeft: '0px',
																								marginRight: '0px'
																				}, 500);
																				$('.company').eq(i).animate({
																								opacity: 1
																				}, 750);
																}, 125*i);
												});
								}
				});

				// Filter Methods
				/*toggleFilters();
							toggleCheckBoxes();
							filterItems();*/

				// ---- CONTACT FORM ---- //
				// Open function
				$('#contact-trigger').click(function(e) {
        // Re-add content for display
        $('#contact form').css('display', 'flex');
        $('#contact .close').show();
        // Run animation
								$('#contact').addClass('popUpLeft');
								$('#drawer-controller').prop('checked', false);
								if ($(window).width() < 768) {
												$('main').find('.logo').removeClass('hidden');
												$('main').find('.subtitle').removeClass('hidden');
								}

								// Animate function
								if (!isMobile() && $('#contact').hasClass('popUpLeft')) {
            $('#contact').css('background-size', 'cover');
												$('#contact').mousemove(function(e) {
																var vertical = 125 + (e.pageY - $(window).scrollTop())/10;
																$('#contact').css('background-size', 'auto ' + vertical + 'vh');
												});
								}

				    // Close functions
				    $('#contact').find('.close').click(function() {
            closeContact();
				    });
				    $('#contact').find('button').click(function() {
            closeContact();
				    });
				    $(document).keydown(function(e) {
								    if (e.keyCode == 27) {
                closeContact();
								    }
				    });

        function closeContact() {
            // Run animation
								    $('#contact').removeClass('popUpLeft');
            setTimeout(function() {
                // Remove content (so it doesn't interfere with the UI)
                $('#contact').find('form').hide();
                $('#contact').find('.close').hide();
            }, 500);
        }
    });
});

function isMobile() {
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

    return isMobile;
}
