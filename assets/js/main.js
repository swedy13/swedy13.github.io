// Global dimensions
var height = $(window).height() + 5;
var unitHeight = parseInt(height) + 'px';
var width = $(window).width() + 5;
var unitWidth = parseInt(width) + 'px';


$(document).ready(function() {
				// Preloader (duration, cycleTime, cleanUp)
				preloader(4000, 750, 5000);

				// Animations (duration)
				risingWave(4500);
				textWave(150);
				textWave(150);

				// Hero Methods
				hero();
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
				/*$(window).scroll(function() {
							if (($('.hero').height() - $(window).scrollTop()) < 10) {
							$('.fillWidth').get(0).pause();
							return;
							}
							$('.fillWidth').get(0).play();
							});*/

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
