function runAnimation(width, height, type){
				var canvas	= document.getElementsByTagName('canvas')[0];
				var c = canvas.getContext("2d");
				canvas.width = width;
				canvas.height = height;

				// Collects portfolio information from the DOM
				var activeName = [];
				var activeLogo = [];
				$('.active').map(function() {
								var text = $(this).text().replace(/\s+/g, '-').toLowerCase();
								var elem = document.getElementsByClassName(text);

								activeName.push(text);
								activeLogo.push(elem[0].childNodes[0]);
				});

				var img = new Image();
				img.onload = start;

				var circles = [];
				var cPos = 200;
				var cMargin = 70;
				var cSpeed = 3;
				for (var i = 0; i < 1; i++) {
								circles.push({
												id: activeName[i],
												img: activeLogo[i],
												size: 50,
												xPos: Math.random() * cPos + cMargin,
												yPos: Math.random() * cPos + cMargin,
												xVel: Math.random() * cSpeed + .25,
												yVel: Math.random() * cSpeed + .25,
								});
								img.src = circles[i].img;
				}

				requestAnimationFrame(start);
				function start(){
								for (var i = 0; i < circles.length; i++) {
												var circle = createImageInCircle(circles[i].img, circles[i].size);
												c.drawImage(circle, circles[i].size, circles[i].size);
								}

								requestAnimationFrame(start);
				}

				function createImageInCircle(img, radius){
								var canvas2 = document.createElement('canvas');
								var c2 = canvas2.getContext('2d');

								canvas2.width = canvas2.height = radius*2;
								for (var i = 0; i < circles.length; i++) {
												c2.fillStyle = 'white';
												c2.beginPath();
												c2.arc(circles[i].xPos, circles[i].yPos, 200, 0, Math.PI*2);
												c2.fill();
												c2.globalCompositeOperation = 'source-atop';
												c2.fillRect(0, 0, radius*2.1, radius*2.1);
												c2.drawImage(img, 0, 0, 100, 100);
								}

								return(canvas2);
				}

				function animateCircle(circle) {
								/*console.log(circle);*/
								// If the circle size/position is greater than the canvas width, bounce x
								if ((circle.width + circle.r > canvas.width) || (circle.width - circle.r < canvas.width)) {
												circle = -circle;
								}

								// If the circle size/position is greater than the canvas width, bounce y
								if ((circle.height + circle.r > canvas.height) || (circle.height - circle.r < canvas.height)) {
												circle = -circle;
								}

								// Generates circle motion by adding position and velocity each frame
								circle.xPos += circle.xVel;
								circle.yPos += circle.yVel;
				}
}
