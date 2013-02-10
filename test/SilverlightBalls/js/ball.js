/**
 * @author alex
 */
var model = {
	"walls" : {"left":0, "top":0, "right": 500, "bottom": 300},
	"elastity" : -0.2,
	"ballRadius" : 26,
	"maxSpeed" : 3.0 
};

// helper
var extend = function(subClass, baseClass)
{
	// Create a new class that has an empty constructor
	// with the members of the baseClass
	function inheritance() {};
	inheritance.prototype = baseClass.prototype;
	
	// set prototype to new instance of baseClass
	// _without_ the constructor
	subClass.prototype = new inheritance();
	subClass.prototype.constructor = subClass;
	subClass.baseConstructor = baseClass;
	
	// enable multiple inheritance
	if (baseClass.base)
	{
		baseClass.prototype.base = baseClass.base;
	}
	subClass.base = baseClass.prototype;
}

/**
 * Base "platform-independent" class representing ball
 * 
 * @param {Object} x
 * @param {Object} y
 * @param {Object} vx
 * @param {Object} vy
 */
function Ball(x, y, vx, vy) {
	// default provisioning
	if (x == undefined) {
		x = (model.walls.right - model.walls.left - 2*model.ballRadius)*Math.random(); 
		y = (model.walls.bottom - model.walls.top - 2*model.ballRadius)*Math.random(); 
		vx = 2*model.maxSpeed*Math.random() - model.maxSpeed;
		vy = 2*model.maxSpeed*Math.random() - model.maxSpeed;
	}
	this._x = x;
	this._y = y;
	this._vx = vx;
	this._vy = vy;
	this._r = model.ballRadius; // d = 52 px
	this._d = 2*this._r;
	this._d2 = this._d*this._d;
}

Ball.prototype.move = function() {
	this._x += this._vx;
	this._y += this._vy;
	// walls collisons
	
	// left
	if (this._x < model.walls.left && this._vx<0) {
		//this._vx += (this._x - walls.left)*elastity;
		this._vx = -this._vx;
	}
	// top
	if (this._y < model.walls.top && this._vy<0) {
		//this._vy += (this._y - walls.top)*elastity;
		this._vy = -this._vy;
	}
	// left
	if (this._x > model.walls.right - this._d && this._vx>0) {
		//this._vx += (this._x - walls.right + this._d)*elastity;
		this._vx = -this._vx;
	}
	// top
	if (this._y > model.walls.bottom - this._d && this._vy>0) {
		//this._vy += (this._y - walls.bottom + this._d)*elastity;
		this._vy = -this._vy;
	}
}

Ball.prototype.doCollide = function(b) {
	// calculate some vectors 
	var dx = this._x - b._x;
	var dy = this._y - b._y;
	var dvx = this._vx - b._vx;
	var dvy = this._vy - b._vy;	
	var distance2 = dx*dx + dy*dy;
		
	if (Math.abs(dx) > this._d || Math.abs(dy) > this._d) 
		return false;
	if (distance2 > this._d2)
		return false;
	
	// make absolutely elastic collision
	var mag = dvx*dx + dvy*dy;
	
	// test that balls move towards each other	
	if (mag > 0) 
		return false;

	mag /= distance2;
	
	var delta_vx = dx*mag;
	var delta_vy = dy*mag;
	
	this._vx -= delta_vx;
	this._vy -= delta_vy;
	
	b._vx += delta_vx;
	b._vy += delta_vy;
		
	return true;
}

/**
 * Abstract test class
 * 
 * @param {Object} N
 */
function BallsTest(N) {
	this._N = N; // number of objects
	this._ballsO = new Array();
	this._isRunning = false;
}

BallsTest.prototype._showFPS = null;

BallsTest.prototype.start = function(N) {
	if (this._isRunning) return false;
	this._isRunning = true;
	
	if (N != undefined) {
		this._N = N;
	}
	
	this._F = 0;  // frames counter for FPS
	this._lastF = 0;
	this._lastTime = new Date();
	var _this = this;
	
	var moveBalls = function() {
		if (_this._N > _this._ballsO.length) 
			return;
		_this._F++;
		// move balls
		for (var i=0; i<_this._N; i++) {
			_this._ballsO[i].move();
		}
		// process collisions
		for (i=0; i<_this._N; i++) {
			for (j=i+1; j<_this._N; j++) {
				_this._ballsO[i].doCollide(_this._ballsO[j]);
			}
		}
	}
	var showFps = function() {
		if (_this._F - _this._lastF < 10) return;
		var currTime = new Date();
		var delta_t = (currTime.getMinutes() - _this._lastTime.getMinutes())*60 + currTime.getSeconds() - _this._lastTime.getSeconds() + (currTime.getMilliseconds() - _this._lastTime.getMilliseconds())/1000.0;
		
		delete currTime; 
		
		var fps = (_this._F - _this._lastF)/delta_t;
		
		_this._lastF = _this._F;
		_this._lastTime = currTime;
		
		if (_this._showFPS) 
			_this._showFPS.call(_this, Math.round(fps));
	}

	this._int1 = setInterval(moveBalls, 5);
	this._int2 = setInterval(showFps, 3000);
	return true;
}
BallsTest.prototype.stop = function(){
	if (!this._isRunning) return false;
	this._isRunning = false;
	clearInterval(this._int1);
	clearInterval(this._int2);
	return true;
}
