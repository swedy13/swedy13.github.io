function drawer(event) {
				var container = $('.drawer-container');

				if (event === 'hover') {
								$('.drawer-controller').mouseover(function() {
												container.addClass('open');
												$('.drawer-controller').addClass('hidden');
								});

								$('.drawer-container').mouseleave(function() {
												container.removeClass('open');
												$('.drawer-controller').removeClass('hidden');
								});
				}
}
