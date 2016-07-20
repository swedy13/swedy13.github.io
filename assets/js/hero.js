function getHero() {
				var videos = ['birdcatcher', 'Hello-World', 'One-Swan', 'Up'];

				for (let video of videos) {
								var randomize = Math.floor(Math.random() * 4);
								var src = `assets\\video\\${videos[randomize]}\\${videos[randomize]}`;

								// Start preloader animatino
								runPreloader();

								// Loads video
								getVideo(src);
				}
}

function runPreloader() {
				// Animates the "loading...." text
				var load = $('.preloader').find('h3');
				setTimeout(function() {
								for (var i = 0; i < load.length; i++) {
												$(load[i]).animate({
																marginTop: 25,
																opacity: 1
												}, 100 + 75*i);
								}
				}, 150);

				setTimeout(function() {
								for (var i = 0; i < load.length; i++) {
												$(load).animate({
																marginTop: 35
												}, 175);
								}
				}, 150);

				// Animate waves
				$('.wave').animate({
								marginTop: -30,
								marginLeft: -400
				}, 4500);

				// Moves the preloader off screen
				$('.preloader').delay(4000).animate({
								top: -height,
								bottom: height,
				}, 750);

				// Removes preloader node
				setTimeout(function() {
							$('.preloader').remove();
							}, 5000);
}

function getVideo(src) {
				$('video img:nth-child(4)').attr('src', `${src}.jpg`);
				$('video source:nth-child(1)').attr('src', `${src}.mp4`);
				$('video source:nth-child(2)').attr('src', `${src}.ogv`);
				$('video source:nth-child(3)').attr('src', `${src}.webm`);

				setTimeout(function() {
								$('.fillWidth').get(0).play();
				}, 4250);
}

function scaleVideoContainer() {
    $('.homepage-hero-module').css('height',unitHeight);
}

function initBannerVideoSize(element){
    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);
}

function scaleBannerVideoSize(element){
    var windowWidth = $(window).width(),
								windowHeight = $(window).height() + 5,
								videoWidth,
								videoHeight;

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
    });
}
