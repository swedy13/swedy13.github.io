function runAnimation(width, height, type) {

				// ---- CANVAS ---- //
				var canvas = document.getElementsByTagName('canvas')[0];
				var c	= canvas.getContext('2d');
				var x	= width;
				var y	= height;
				var container = {x:0, y:0, width:x, height:y};

				canvas.width = x;
				canvas.height = y;


				// ---- CIRCLES ---- //
				var circles = [];
				var cPos				= 200;
				var cMargin = 70;
				var cSpeed		= 3;
				var r							= x * 0.075;

				// Modifies ratios for responsive performance
				if (y > x && x >= 500) {
								// For portrait orientations of 500px or more in width
								cPos =  x * (x / y) - 150;
								cMargin = 150;
				}

				if (x > y) {
								// For all landscape orientations
								cPos = y * (y / x) - 50;
								cMargin = 150;
								r = x * 0.05;
				}

				// Collects portfolio information from the DOM
				var activeName = [];
				var activeLogo = [];
				$('.active').map(function() {
								var text = $(this).text().replace(/\s+/g, '-').toLowerCase();
								var elem = document.getElementsByClassName(text);

								activeName.push(text);
								activeLogo.push(elem[0].childNodes[0].src);
				});

				// Populates circles data to eventually generate canvas objects
				for (var i = 0; i < $('.active').length; i++) {
								circles.push({
												id: activeName[i],
												r: r,
												color: 100,
												logo: `${activeLogo[i]}`,
												x: Math.random() * cPos + cMargin,
												y: Math.random() * cPos + cMargin,
												vx: Math.random() * cSpeed + .25,
												vy: Math.random() * cSpeed + .25
								});
				}


				// ---- DRAW ---- //
				requestAnimationFrame(draw);
				function draw() {
								c.fillStyle = 'red';
								c.fillRect(container.x, container.y, container.width, container.height);

								// Generates a new canvas object for each active portfolio item
								for (var i = 0; i < circles.length; i++) {
												var img = new Image();
												img.onload = createCircle(circles[i]);
												img.src = circles[i].logo;

												// Clips portfolio logo to the canavs object
												function createCircle(circle) {
																var newCircle = clipLogo(img, circle.r);
																c.drawImage(newCircle, circles[i].x, circles[i].y);
												}

												animateCircle(circles[i]);
								}

								requestAnimationFrame(draw);
				}

				// Clipping Process
				function clipLogo(img, radius) {
								var canvas2 = document.createElement('canvas');
								var c2 = canvas2.getContext('2d');

								/*canvas2.width = canvas2.height = (radius * 2);*/

								c2.beginPath();
								c2.arc(radius, radius, radius, 0, Math.PI * 2);
								c2.fill();
								c2.globalCompositionOperation = 'source-atop';
								c2.drawImage(img, 0, 0, radius * 2, radius * 2);
								return(canvas2);
				}

				function animateCircle(circle) {
								// If the circle size/position is greater than the canvas width, bounce x
								if ((circle.x + circle.vx + circle.r > container.width) || (circle.x - circle.r + circle.vx < container.x)) {
												circle.vx = -circle.vx;
								}

								// If the circle size/position is greater than the canvas width, bounce y
								if ((circle.y + circle.vy + circle.r > container.height) || (circle.y - circle.r + circle.vy < container.y)){
												circle.vy = -circle.vy;
								}

								// Generates circle motion by adding position and velocity each frame
								circle.x += circle.vx;
								circle.y += circle.vy;
				}


				// Circles
				/*var logo1 = clipLogo(img, 50);
							var logo2 = clipLogo(img, 50);

							c.drawImage(logo1, 35, 40);
							c.drawImage(logo2, 100, 75);*/
}
