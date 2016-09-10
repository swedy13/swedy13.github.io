// Imports
var hero = './hero.js';

// Global dimensions
var height = $(window).height() + 5;
var unitHeight = parseInt(height) + 'px';
var width = $(window).width() + 5;
var unitWidth = parseInt(width) + 'px';


$(document).ready(function() {
				// Preloader (duration, cycleTime, cleanUp)
				/*preloader(4000, 750, 5000);*/

				// Animations (duration)
				/*risingWave(4500);
							textWave(150);
							textWave(150);*/

				// Hero Methods
				hero();
				drawer();

				$(window).scroll(function() {
								var fadeDistance = $(window).height() / 2;
								var fadePercent = $(window).scrollTop() / fadeDistance;

								if ($(fadePercent < 2)) {
												$('.fadeout').animate({
																paddingTop: 400*fadePercent,
																opacity: 1.75-fadePercent,
												}, 1);
								}
				})

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


				// Anchor link (smooth scrolling)
				$('img.more').click(function() {
								var portfolio = $('.services').offset().top;

								$('body').animate({
												scrollTop: portfolio
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
				$('#contact-trigger').click(function() {
								$('#contact').toggleClass('popUpLeft');
								$('#drawer-controller').prop('checked', false);
								if ($(window).width() < 768) {
												$('main').find('.logo').removeClass('hidden');
												$('main').find('.subtitle').removeClass('hidden');
								}
				});
				$('#contact').find('.close').click(function() {
								$('#contact').removeClass('popUpLeft');
				});
				$(document).keydown(function(e) {
								if (e.keyCode == 27) {
												$('#contact').removeClass('popUpLeft');
								}
				});
});
