// Animate waves
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
