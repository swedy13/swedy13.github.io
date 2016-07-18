// Global dimensions
var height = $(window).height() + 5;
var unitHeight = parseInt(height) + 'px';
var width = $(window).width() + 5;
var unitWidth = parseInt(width) + 'px';


$(document).ready(function() {

				// Hero Methods
				randomizeVideo();
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

				// pauses the video if not visible
				$(window).scroll(function() {
								if (($('.hero').height() - $(window).scrollTop()) < 10) {
												$('.fillWidth').get(0).pause();
												return;
								}
								$('.fillWidth').get(0).play();
				});

				// Anchor link (smooth scrolling)
				$('img.more').click(function() {
								var portfolio = $('.portfolio').offset().top;

								$('body').animate({
												scrollTop: portfolio
								}, 500);
				});


				// Portfolio Methods
				toggleFilters();
				toggleCheckBoxes();
				filterItems();

				// Generates the initial canvas and objects
				runAnimation(width, height, 'all');

				// Redraws the canvas (not the objects) on resize
				$(window).resize(function() {
								runAnimation($(window).width(), $(window).height(), 'canvas');
				});


				// Profile Links
				$('.card').click(function() {
								if ($(this).hasClass('quora')) {
												window.open('https://www.quora.com/profile/Mark-Swedberg', '_blank');
								}
								else if ($(this).hasClass('linkedin')) {
												window.open('https://www.linkedin.com/in/markswedberg', '_blank');
								}
								else if ($(this).hasClass('github')) {
												window.open('https://github.com/swedy13', '_blank');
								}
								else {
												window.open('https://www.upwork.com/fl/markswedberg', '_blank');
								}
				});
});
