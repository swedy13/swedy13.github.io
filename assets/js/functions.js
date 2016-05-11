// ------------------------------------------------------
// *********************  GLOBAL METHODS  **********************
// ------------------------------------------------------
// PAGE IDENTIFIER
// This function runs the rest of the methods on this page
$('document').ready(function() {
				navScroll();
				navHover();

				// HOME PAGE
				if ($('div').hasClass('home')) {
								homeMethods();

								slideLoad();
								showcaseSlider();
								slideAnimation();
								toggleZoom();

								logoAnimation();
								menuAnimation();
								toggleMenu();
				}
});


function logoAnimation() {
				$('.logo').hover(function() {
								$('.logo').toggleClass('animated swing');
				});
}


function menuAnimation() {
				$('.mobile-nav').hover(function() {
								$('.mobile-nav').toggleClass('animated tada');
				});
}


function toggleMenu() {
				$('html').click(function() {
								$('.nav-links').fadeOut(150);
				});

				$('.mobile-nav').click(function(e) {
								e.stopPropagation();
								$('.nav-links').fadeToggle(150);
				});
}


function navHighlight(linkNum) {
				$('li').children('div').eq(linkNum).addClass('current-nav');
}


function navHover() {
				// Highlights link
				$('.nav-links').find('li').mouseenter(function() {
								$(this).find('.nav-color').addClass('nav-highlight');
				});
				$('.nav-links').find('li').mouseleave(function() {
								$(this).find('.nav-color').removeClass('nav-highlight');
				});
};

// NAV SCROLL
function navScroll() {
				$(window).scroll(function() {
								var windowPosition	= $(window).scrollTop();
								var header = $('.site-header');

								if (windowPosition > 5) {
												header.addClass('invisible');
								}

								if (windowPosition < 5) {
												header.removeClass('invisible');
								}
				});
}

// PAGE TITLE LOAD ANIMATION
function pageTitleReveal(selectorName, animationType) {
				var selector = $("." + selectorName);
				var animation = 'animated ' + animationType;

				selector.show().css('visibility', 'visible').addClass(animation);
};

// CSS ANIMATION
function animationEffect(selectorName, animationType, animationSpeed) {
				var selector = $("." + selectorName);
				var animation = 'animated ' + animationType;

				selector.each(function(i) {
								setTimeout(function() {
												selector.eq(i)
																				.css('visibility', 'visible')
																				.addClass(animation);
								}, animationSpeed * i);
				});
};


// ------------------------------------------------------
// ****************  HOME PAGE METHODS  ******************
// ------------------------------------------------------
function homeMethods() {

				$(window).scroll(function() {
								var windowPosition	= $(window).scrollTop();

								// Fires events on scroll
								function scrollEvent(selectorName, divisor) {
												var windowOffset = $(selectorName).offset().top;
												var windowHeight = $(window).height();

												if (windowOffset - (windowHeight / divisor) < windowPosition) {
																var fireEvent = true;
																return fireEvent;
												}
								}

								// Parallax
								var parallaxWidth		= $('.color-overlay').width();
								var parallaxHeight	= $('.home-parallax').height();
								var viewedParallax	= windowPosition / parallaxHeight;

								if (viewedParallax < 1) {
												var parallaxFilters = 'grayscale(' + viewedParallax + ') brightness(' + (1 - viewedParallax / 2) + ')';
												var parallaxScale = 1 + (viewedParallax * .25);
												var parallaxOffset = -parallaxScale*50;
												$('.home-parallax-color-overlay').css({'opacity':(viewedParallax / 2)});
												$('.home-parallax').css({WebkitFilter: parallaxFilters});
								}

								// Companies
								if ($('#home-companies').offset().top - ($(window).height() / 1.1) < windowPosition) {
												pageTitleReveal('home-companies-title', 'fadeInLeft');
												animationEffect('home-companies-logo-thumb', 'bounceInUp', 150);
								}

								// Skills
								if (scrollEvent('#skills', 1.6)) {
												/*pageTitleReveal('skills-title', 'zoomIn');*/
												setTimeout(function() {
																animationEffect('card', 'flipInY', 150)
												}, 300);
												setTimeout(function() {
																$('.card-more')
																			.css('visibility', 'visible')
																			.addClass('animated fadeIn');
												}, 1400);
								}
				});
}


// ------------------------------------------------------
// *************  COMPANIES FEED METHODS  ***************
// ------------------------------------------------------
function companiesMethods() {
				// On-load animations
				pageTitleReveal('companies-title', 'zoomIn');
				setTimeout(function() {
								animationEffect('companies-container', 'fadeInRight', 200)
				}, 450);
}


// ------------------------------------------------------
// *************  PORTFOLIO FEED METHODS  ***************
// ------------------------------------------------------
function portfolioMethods() {
				// On-load animations
				pageTitleReveal('portfolio-title', 'zoomIn');
				setTimeout(function() {
								animationEffect('portfolio-card', 'flipInY', 125)
				}, 300);
}


// ------------------------------------------------------
// **************  ARTICLES FEED METHODS  ***************
// ------------------------------------------------------
function articlesMethods() {
				// On-load animations
				setTimeout(function() {
								pageTitleReveal('articles-title', 'zoomIn');
				}, 150);
				setTimeout(function() {
								animationEffect('post', 'fadeInUp', 350);
				}, 750);
}


// ------------------------------------------------------
// *****************  SHOWCASE SLIDER  ******************
// ------------------------------------------------------
function slideLoad() {
				$('.hero').css('opacity', '0').animate({opacity: 1}, 1500);
				setTimeout(function() {
								$('.content').slideDown(150).css('display', 'flex');
				}, 2000);
}

function showcaseSlider() {
				var slides = $('.slide');
				var position = 1;
				changeSlide(position);

				// Click Events
				$('.backward').click(function() {
								changeSlide(position -= 1);
								slideAnimation('fadeIn');
				});
				$('.forward').click(function() {
								changeSlide(position += 1);
								slideAnimation('fadeIn');
				});

				// Swipe Events
				$('.backward').on('swipe', function() {
								changeSlide(position -= 1);
								slideAnimation('fadeIn');
				});
				$('.forward').on('swipe', function() {
								changeSlide(position += 1);
								slideAnimation('fadeIn');
				});

				// Keyboard Events
				$('body').keydown(function(e) {
								if (e.keyCode == 37) {
												changeSlide(position -= 1);
												slideAnimation('fadeIn');
								}
								else if (e.keyCode == 39) {
												changeSlide(position += 1);
												slideAnimation('fadeIn');
								}
				});

				function changeSlide(currentPosition) {
								if (currentPosition > slides.length) {position = 1}
								if (currentPosition < 1) {position = slides.length}

								for (var i = 0; i < slides.length; i++) {
												slides[i].classList.remove('visible');
								}

								var adjustedSlide = slides[position-1];
								adjustedSlide.classList.add('visible');

								$('.slider-position').html(position + ' / ' + slides.length);
				}
}

function slideAnimation(animation) {
				var image = $('.visible').find('.hero');
				image.removeClass('fadeInLeft fadeInRight');
				image.addClass(animation);
}

function toggleZoom() {
				$('.hero').click(function() {
								$('.slide').toggleClass('zoom');
								$('.iterator').toggleClass('zoom');
				});
				$('body').keydown(function(e) {
								if (e.keyCode == 27) {
												$('.slide').removeClass('zoom');
												$('.iterator').removeClass('zoom');
								}
				});
				$('.exit-view').click(function(e) {
								e.stopPropagation();
								$('.slide').removeClass('zoom');
								$('.iterator').removeClass('zoom');
				});
}
