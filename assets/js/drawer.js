function drawer() {

				// Function Variables
				var content = $('main');
				var drawer = $('#drawer');
				var container = $('#drawer-container');
				var controller = $('#drawer-controller');

				// Function Methods
				function open() {
								controller.prop('checked', true);
								if ($(window).width() < 768) {
												content.find('.logo').addClass('hidden');
												content.find('.subtitle').addClass('hidden');
								}
				}
				function close() {
								controller.prop('checked', false);
								if ($(window).width() < 768) {
												content.find('.logo').removeClass('hidden');
												content.find('.subtitle').removeClass('hidden');
								}
				}


				// ---- INTERACTIONS ---- //
				content.click(function() {
								if (container.css('width') !== '0px') {
												close();
								}
				});

				// Keyboard Events
				$('body').keydown(function(e) {
								if (e.keyCode == 39) {
												open();
								}
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
}
