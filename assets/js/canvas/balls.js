// ---- Bouncing Portfolio ---- //
var b2 = {
				Vec2 : Box2D.Common.Math.b2Vec2,
				BodyDef : Box2D.Dynamics.b2BodyDef,
				Body : Box2D.Dynamics.b2Body,
				FixtureDef : Box2D.Dynamics.b2FixtureDef,
				Fixture : Box2D.Dynamics.b2Fixture,
				World : Box2D.Dynamics.b2World,
				MassData : Box2D.Collision.Shapes.b2MassData,
				PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
				CircleShape : Box2D.Collision.Shapes.b2CircleShape,
				DebugDraw : Box2D.Dynamics.b2DebugDraw
};

// Scale converts meters to pixels
var SCALE = 30;
var stage, world;

function initBouncingPortfolio() {
				stage = new createjs.Stage(document.getElementById('canvas'));

				setupPhysics();

				// Balls
				stage.on('stagemousedown', function(e) {
								var fixDef = new b2.FixtureDef();
								fixDef.density = 1;
								fixDef.friction = 0.5;
								fixDef.restitution = 1; // bounciness

								var bodyDef = new b2.BodyDef();
								bodyDef.type = b2.Body.b2_dynamicBody;
								bodyDef.position.x = Math.random() * 10.25;
								bodyDef.position.y = Math.random() * 50 / SCALE;
								fixDef.shape = new b2.CircleShape(.5);
								world.CreateBody(bodyDef).CreateFixture(fixDef);
				});

				createjs.Ticker.addEventListener('tick', tick);
				createjs.Ticker.setFPS(60);
				createjs.Ticker.useRAF = true;
}

function setupPhysics() {
				// Create a new world where gravity is zero and sleep is turned off
				world = new b2.World(new b2.Vec2(0, 1), false);

				// Create the container
				var fixDef = new b2.FixtureDef();
				fixDef.density = 1;
				fixDef.friction = 0.5;

				var bodyDef = new b2.BodyDef();
				bodyDef.type = b2.Body.b2_staticBody;
				bodyDef.position.x = 0;
				bodyDef.position.y = 20.025;
				fixDef.shape = new b2.PolygonShape();
				fixDef.shape.SetAsBox(13, 15);
				world.CreateBody(bodyDef).CreateFixture(fixDef);

				// Setup debug for visibility
				var debugDraw = new b2.DebugDraw();
				debugDraw.SetSprite(stage.canvas.getContext('2d'));
				debugDraw.SetDrawScale(SCALE);
				debugDraw.SetFlags(b2.DebugDraw.e_shapeBit | b2.DebugDraw.e_jointBit);
				world.SetDebugDraw(debugDraw);
}

function tick() {
				stage.update();
				world.DrawDebugData();
				world.Step(1/60, 10, 10); // time / velocity / position
				world.ClearForces();
}
