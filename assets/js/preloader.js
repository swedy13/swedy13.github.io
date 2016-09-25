$(document).ready(function() {
    preloader();
});

// ---- PRELOADER ---- //
function preloader() {
    // Temporarily disables scrolling
    $('body').css('overflow-y', 'hidden');

    // Load Videos
    var videos = $('#preloader .item');
    for (var i = 0; i < videos.length; i++) {
        $(videos[i]).css('animation-delay', .15 + .25*i + 's').addClass('fade');
    }

    // Video Select
    $('#preloader .gallery .item').click(function() {
        // Gets the user-selected video title (see below)
        var src = $(this).attr('data-attribute');

        if (src == 'birdcatcher') {
            $('body').addClass('dark');
            $('#hero').find('h1, h3, .menu-icon').addClass('dark');
            $('#drawer').addClass('dark');
        }
        else {
            $('body').addClass('light');
            $('#drawer').addClass('light');
        }

        // Hides the initial screen (videos & text)
        $('#preloader h1').hide();
        $('#preloader h4').hide();
        $('#preloader .gallery').hide();

        // Re-aligns the content
        $('#preloader').css('align-content', 'center');

        // Reveals the loading animation
        setTimeout(function() {
            // Loads animation elements
            $('#preloader .fishbowl').fadeIn();
            $('#preloader .text-wave').css('display','flex').hide().fadeIn();

            // Loads the background video
            loadVideo(src);
        }, 250);

        // Runs the loading animation
        setTimeout(function() {
            risingWave(4000);
            textWave(0);
            textWave(1500);
            cleanup(3750);
        }, 300);

        // Plays the video
        setTimeout(function() {
            // Re-enables scrolling
            $('body').css('overflow-y', 'auto');

            // Starts the video on page load
            playVideo();
        }, 3750);
    });
}

// Video loader
function loadVideo(src) {
    // Creates a video element as a child of the hero element
				var video = document.createElement("video");
    document.getElementById('hero').appendChild(video);

    // Modifies video attributes
    video.setAttribute('id', 'hero-video');
				video.setAttribute('poster', 'assets/video/' + src + '/' + src + '.jpg');

				var element = ['mp4', 'ogg', 'webm', 'jpg'];
				for (var i = 0; i < element.length; i++) {
								if (element[i] === 'jpg') {
            // Creates the HTML5 Video placeholder image
												var $this = document.createElement('img');
								}
								else {
            // Creates the HTML5 Video formats
												var $this = document.createElement('source');
												$this.type = 'video/' + element[i];
								}

								$this.src = 'assets/video/' + src + '/' + src + '.' + element[i];
								video.appendChild($this);
				}
}

// Plays the video
function playVideo() {
				var video = $('video').get(0);

				// Autoplays video on normal browsers
				video.play();

				// Mobile Autoplay
				// Video is disabled in Mobile browsers without user interaction
				setTimeout(function() {
								if (video.currentTime === 0) {
												var touchType = ['tap', 'press', 'swipeleft', 'swiperight'];
												for (var i = 0; i < touchType.length; i++) {
																$('main').hammer().on(touchType[i], function() {
				                video.play();
																});
												}
												return;
								}
				}, 2500);

				// Mobile Loop
				// Reloading video is disabled on some mobile browsers
				video.onended = function() {
								video.currentTime - 0.1;
				    video.play();
				}
}

// Animates the waves
function risingWave(duration) {
				$('.fishbowl').find('.wave').animate({
								top: '-50px',
								left: '-500px'
				}, duration);
				$('.fishbowl').find('.background').animate({
								top: '-25px'
				}, duration);
}

// Animates the "loading...." text
function textWave(duration) {
				var load = $('.text-wave').find('.letter');

    setTimeout(function() {
        for (var i = 0; i < load.length; i++) {
            $(load[i]).animate({
                marginBottom: "35px",
                opacity: 1
            }, 100 + 100*i);
        }
    }, duration);

    setTimeout(function() {
        for (var i = 0; i < load.length; i++) {
            $(load[i]).animate({
                marginBottom: "25px"
            }, 175);
        }
    }, duration);
}

// Removes the preloader and enters the site
function cleanup(duration) {
    var height = $(window).height();
    // Moves the preloader off screen
				$('#preloader').delay(duration).animate({
							 top: -height,
							 bottom: height
				}, 750);

				setTimeout(function() {
				    // Removes preloader node from DOM
								$('#preloader').remove();
				}, duration + 1000);
}
