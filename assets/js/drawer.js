function drawer(action) {
				// Function Variables
				var content = $('main');
				var drawer = $('.drawer');
				var container = $('.drawer-container');
				var controller = $('.drawer-controller');
				var status;

				// Function Methods
				function open() {
								container.addClass('open');
								controller.addClass('hidden');
								content.find('.content').stop().animate({
												right: '150px'
								}, 115);
								if ($(window).width() < 767) {
												content.find('.logo').addClass('hidden');
												content.find('.subtitle').addClass('hidden');
								}
				}
				function close() {
								container.removeClass('open');
								controller.removeClass('hidden');
								content.find('.content').stop().animate({
												right: 0
								}, 115);
								content.find('.logo').removeClass('hidden');
								content.find('.subtitle').removeClass('hidden');
				}


				// ---- INTERACTIONS ---- //
				// Click Events
				controller.click(function() {
								open();
				});

				content.click(function() {
								if (container.css('width') !== '0px') {
												close();
								}
				});

				// Hover Events
				if (action === 'hover') {
								if (container.css('width') === '0px') {
												controller.mouseover(function() {
																open();
												});
								}

								$('.drawer-container').mouseleave(function() {
												close();
								});
				}

				// Keyboard Events
				$('body').keydown(function(e) {
								if (e.keyCode == 39) {
												open();
								}
				});

				$('body').keydown(function(e) {
								if (e.keyCode == 37) {
												close();
								}
				});

				// Swipe Events
				$(document).hammer().on('swipeleft', function() {
								open();
				});
				$(document).hammer().on('swiperight', function() {
								close();
				});


				// ---- STYLING ---- //
				/*console.log(open);*/
}
