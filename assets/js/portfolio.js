function runAnimation(width, height, type){
				var canvas	= document.getElementsByTagName('canvas')[0];
				var c = canvas.getContext('2d');

				// ---- DIMENSIONS ---- //
				// Container
				var x = width;
				var y = height - 65;
				canvas.width = x;
				canvas.height = y;
				var container = {x: 0 ,y: 0 ,width: x, height: y};

				// Portrait Variables
				var cPos    = 200;
				var cMargin = 70;
				var cSpeed		= 3;
				var r							= x*.075;

				if (y > x && x >= 500) {
								cPos    = x * (x / y) - 150;
								cMargin = 150;
				}

				// Landscape Variables
				if (x > y) {
								cPos    = y * (y / x) - 50;
								cMargin = 150;
								cSpeed		= 3;
								r							= x*.05;
				}


				// ---- CIRCLES ---- //
				// Circles
				var circles = [];
				var img = new Image();

				// Gets active post ids and count
				var activeName  = [];
				var activeLogo  = [];
				var activePosts = $('.active').map(function() {
								activeName.push($(this).text().replace(/\s+/g, '-').toLowerCase());

								// Returns the image source
								/*activeLogo.push($(this).find('img').prop('src'));*/

								// Returns an image node
								var elem = document.getElementsByClassName($(this).text().replace(/\s+/g, '-').toLowerCase())
								activeLogo.push(elem[0].childNodes[0]);
				});

				// Populates circle data
				for (var i = 0; i < $('.active').length; i++) {
								circles.push({
												id:activeName[i],
												r:r,
												color: 100,
												/*image: activeLogo[i],*/
												x:Math.random() * cPos + cMargin,
												y:Math.random() * cPos + cMargin,
												vx:Math.random() * cSpeed + .25,
												vy:Math.random() * cSpeed + .25
								});
				}


				// ---- DRAW ---- //
				requestAnimationFrame(draw);
				function draw(){
								c.fillStyle = 'white';
								c.fillRect(container.x, container.y, container.width, container.height);

								for (var i = 0; i < circles.length; i++){
												/*var img = new Image();
															var path = circles[i].image;*/
												/*var size = circles[i].r * 2;*/
												/*img.src = circles[4].image;*/
												var img = activeLogo[i];
												img.onload = function (circles) {
																/*c.drawImage(img, 0, 0, size, size);*/

																var pattern = c.createPattern(this, "repeat");
																c.fillStyle = pattern;
																c.fill();
												};

												c.fillStyle = 'hsl(' + circles[i].color + ', 100%, 50%)';
												c.beginPath();
												c.arc(circles[i].x, circles[i].y, circles[i].r, 0, 2*Math.PI, false);
												c.fill();


												// If the circle size/position is greater than the canvas width, bounce x
												if ((circles[i].x + circles[i].vx + circles[i].r > container.width) || (circles[i].x - circles[i].r + circles[i].vx < container.x)) {
																circles[i].vx = -circles[i].vx;
												}

												// If the circle size/position is greater than the canvas width, bounce y
												if ((circles[i].y + circles[i].vy + circles[i].r > container.height) || (circles[i].y - circles[i].r + circles[i].vy < container.y)){
																circles[i].vy = -circles[i].vy;
												}

												// Generates circle motion by adding position and velocity each frame
												circles[i].x += circles[i].vx;
												circles[i].y += circles[i].vy;
								}
								requestAnimationFrame(draw);
				}
}
