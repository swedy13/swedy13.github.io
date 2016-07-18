// ---- FILTERS ---- //
function toggleFilters() {
				$('.filters > div').click(function(e) {
								e.stopPropagation();
								var list = $(this).find('ul');
								var target = $(event.target);

								$(this).siblings().find('ul').slideUp(75);

								if (list.css('display') === 'block') {
												if (target.is('button') || target.parent().is('button')) {
																list.slideUp(75);
												}
								}
								else {
												list.slideDown(75);
								}
				});

				$(document).click(function() {
								$('ul').slideUp(75);
				});
}

function toggleCheckBoxes() {
				$('.filters li').click(function() {
								if (!$(event.target).is('input')) {
												var checkbox = $(this).find('input');
												checkbox.prop('checked', !checkbox.prop('checked'));
								}
				});
}

function filterItems() {
				$('li').click(function() {
								// Removes all active classes
								$('.company').removeClass('active');

								// Returns the names of each checked category
								const checked = $('.checkbox:checkbox:checked').map(function() {
												const getText = $(this).next('p').text();
												const toString = getText.replace(/\s+/g, '-').toLowerCase();
												return toString;
								}).get();

								// Determines which objects to show
								if (checked.length === 0) {
												// Activates all objects if no filters are selected
												$('.company').addClass('active');
								}

								else {
												// Returns portfolio items based on the filters
												$('.company').map(function() {
																const classes = $(this).prop('class');
																const matches = [];

																// Adds checked items to an array
																for (var i = 0; i < checked.length; i++) {
																				if (classes.match(checked[i])) {
																								matches.push($(this));
																				}
																}

																// Displays items that match all checked filters
																var match = matches[checked.length-1];
																for (var i = 0; i < matches.length; i++) {
																				if (match != undefined) {
																								match.addClass('active');
																				}
																}
												});
								}

								// Redraws canvas
								runAnimation($(window).width(), $(window).height(), 'canvas');
				});
}
