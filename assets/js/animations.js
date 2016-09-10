// Animate waves
function risingWave(duration) {
				$('.rising-wave').fadeIn(1000).find('.wave').animate({
								marginTop: -30,
								marginLeft: -400
				}, duration);
}


// Animates the "loading...." text
function textWave(duration) {
				var load = $('.text-wave').find('div');
				setTimeout(function() {
								for (var i = 0; i < load.length; i++) {
												$(load[i]).animate({
																marginTop: 25,
																opacity: 1
												}, 100 + 75*i);
								}
				}, duration);

				setTimeout(function() {
								for (var i = 0; i < load.length; i++) {
												$(load).animate({
																marginTop: 35
												}, 175);
								}
				}, duration);
}


// FadeOut

