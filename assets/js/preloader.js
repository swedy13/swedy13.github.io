function preloader(duration, cycleTime, cleanUp) {
				// Moves the preloader off screen
				$('.preloader').delay(duration).animate({
								top: -height,
								bottom: height,
				}, cycleTime);

				// Removes preloader node
				setTimeout(function() {
								$('.preloader').remove();
				}, cleanUp);
}

