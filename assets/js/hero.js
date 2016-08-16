function hero() {
				var videos = ['Hello-World', 'One-Swan', 'Up', 'birdcatcher'];
				var randomize = Math.floor(Math.random() * 4);
				var src = 'assets/video/' + videos[randomize] + '/' + videos[randomize];

				// Creates and inserts and randomized video element into the hero section
				/*setTimeout(function() {
							getVideo(src);
							}, 3000);*/
				getVideo(src);

				if (src.includes('birdcatcher')) {
								$('#hero').find('.bullet').removeClass('light').addClass('dark');
								$('.drawer').removeClass('light').addClass('dark');
				}
}

function getVideo(src) {
				var video = document.createElement("video");
				video.setAttribute('id', 'hero-video');
    document.getElementById('hero-container').appendChild(video);

				var element = ['mp4', 'ogg', 'webm', 'jpg'];
				for (var i = 0; i < element.length; i++) {
								if (element[i] === 'jpg') {
												var $this = document.createElement('img');
								}
								else {
												var $this = document.createElement('source');
												$this.type = 'video/' + element[i];
								}

								$this.src = src + '.' + element[i];
								video.appendChild($this);
				}

				video.play();
				video.loop = true;
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
