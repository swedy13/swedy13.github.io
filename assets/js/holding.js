function getDimensions(width, height) {
				var canvas	= document.getElementsByTagName('canvas')[0];
				var c = canvas.getContext('2d');

				// Container
				// container dimensions to scale with screen size
				var x = width;
				var y = height - 65;
				canvas.width = x;
				canvas.height = y;
				var container = {x:0,y:0,width:x,height:y};

				// Circles
				var circles = [];

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
								r							= x*.05;
				}

				// Generating "circles" based on # of portfolio items
				// x/y = starting coordinates, r = ball size, vx/vy = velocity
				var posts = document.getElementsByClassName('active').length;
				for (var i = 0; i < posts; i++) {
								circles.push({
												x:Math.random() * cPos + cMargin,
												y:Math.random() * cPos + cMargin,
												r:r,
												color:Math.random()*3000,
												vx:Math.random() * cSpeed + .25,
												vy:Math.random() * cSpeed + .25
								});
				}

				var dimensions = {
								canvas: canvas,
								c: c,
								container: container,
								circles: circles,
								cPos: cPos,
								cMargin: cMargin,
								cSpeed: cSpeed,
								r: r
				}

				return dimensions;
}


function drawCanvas() {
				var d = getDimensions(width, height); // Dimensions
				var c = d.c;
				var container = d.container;

				c.fillStyle = 'red';
				c.fillRect(container.x,container.y,container.width,container.height);

				/*requestAnimationFrame(drawCanvas)*/
}


function	drawCircles() {
				var d = getDimensions(width, height); // Dimensions
				var c = d.c;
				var container = d.container;
				var circles = d.circles;

				for (var i=0; i <circles.length; i++){
								c.fillStyle = 'hsl(' + circles[i].color + ',100%,50%)';
								c.beginPath();
								c.arc(circles[i].x,circles[i].y,circles[i].r,0,2*Math.PI,false);
								c.fill();

								console.log(circles[i].x, circles[i].vx, circles[i].r)
								// If the circle
								if((circles[i].x + circles[i].vx + circles[i].r > container.x + container.width)
												|| (circles[i].x - circles[i].r + circles[i].vx < container.x)){
																circles[i].vx = - circles[i].vx;
								}
								if((circles[i].y + circles[i].vy + circles[i].r > container.y + container.height) || (circles[i].y - circles[i].r + circles[i].vy < container.y)){
												circles[i].vy = - circles[i].vy;
								}
								circles[i].x +=circles[i].vx;
								circles[i].y +=circles[i].vy;
				}

				requestAnimationFrame()
}
