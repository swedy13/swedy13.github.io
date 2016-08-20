function drawer(event) {
				// Function Variables
				var content = $('main');
				var drawer = $('.drawer');
				var container = $('.drawer-container');
				var controller = $('.drawer-controller');

				// Function Methods
				function open() {
								container.addClass('open');
								controller.addClass('hidden');
								content.find('.content').stop().animate({
												right: '150px'
								}, 115);
				}
				function close() {
								container.removeClass('open');
								controller.removeClass('hidden');
								content.find('.content').stop().animate({
												right: 0
								}, 115);
				}


				// Hover Events
				if (event === 'hover') {
								controller.mouseover(function() {	open()	});

								$('.drawer-container').mouseleave(function() { close()	});
				}


				// Keyboard Events
				$('body').keydown(function(e) {
								if (e.keyCode == 39) { open()	}
				});

				$('body').keydown(function(e) {
								if (e.keyCode == 37) {	close()	}
				});
}
