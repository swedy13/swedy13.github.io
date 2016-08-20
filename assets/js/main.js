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
				drawer('hover');
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


				// Filter Methods
				/*toggleFilters();
							toggleCheckBoxes();
							filterItems();*/
});
