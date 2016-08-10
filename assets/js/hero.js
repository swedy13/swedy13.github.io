function hero() {
				var videos = ['Hello-World', 'One-Swan', 'Up'];

				for (let video of videos) {
								var randomize = Math.floor(Math.random() * 3);
								var src = `assets\\video\\${videos[randomize]}\\${videos[randomize]}`;

								// Loads video
								getVideo(src);
				}
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
