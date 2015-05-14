window.onload = first_step;

var WIDTH = 500, HEIGHT = 600, pi = Math.PI, KEY_LEFT  = 100, KEY_RIGHT = 102;
var dx = 3; dy = 3;
var canvas, ctx, keystate, score, best, hasLost;
var player, ball,

player = {
	x: null,
	y: null,
	width:  100,
	height: 20,
	
	update: function() {
		if (keystate[KEY_LEFT]) this.x -= 10;
		if (keystate[KEY_RIGHT]) this.x += 10;
		this.x = Math.max(Math.min(this.x, WIDTH - this.width), 0);
	},
	
	draw: function() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
},

ball = {
	x: null,
	y: null,
	side: 20,
	update: function(){

		this.x = this.x + dx;
		if (this.x > WIDTH - this.side) {
			this.x -= 2 * Math.abs(dx);
			if (dx > 0) 
				dx = -dx;
		}
		if (this.x <  0) {
			this.x += 2 * Math.abs(dx);
			if (dx < 0) 
				dx = -dx;
		}
		this.y = this.y + dy;
		if (this.y > HEIGHT - player.height - 10) {
			this.y -= 2 * Math.abs(dy);
			if (dy > 0)
				dy = -dy;
			if (Math.abs(this.x - player.x - 1) > player.width) {
				hasLost = true;
				updateHighScore();
				score = 0;
			}
			else {
				score = score +1;
				}
		}
		if (this.y <  0) {
			this.y += 2 * Math.abs(dy);
			if (dy < 0) 
				dy = -dy; 
		}
	},
	draw: function(){
		ctx.fillRect(this.x, this.y, this.side, this.side);

	}
};

function main(){
	keystate={};
	// keep track of keyboard presses
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});
	init();
	var loop = function(){
		update();
		draw();
		if(hasLost)
			game_over();
		else
			window.requestAnimationFrame(loop, canvas);
	};
	window.requestAnimationFrame(loop, canvas);
}
function init() {
	score = 0;
	best = -1;
	hasLost = false;
	player.y = HEIGHT - player.height - 10;
	player.x = (WIDTH - player.width)/2;	
	ball.x = 0;
	ball.y = 0;
}

function update(){
	player.update();
	ball.update();
}

function draw(){
	ctx.font = "20px Arial";
	ctx.fillStyle = "#FF8080";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.save();
	ctx.fillStyle = "black";
	player.draw();
	ctx.fillStyle = "white";
	ball.draw();
	ctx.fillStyle = "#0f0";
	ctx.fillText("SCORE: " + score, 10, 32);
	ctx.restore();
}

function updateHighScore(){
	var highScore = document.getElementById("score");
	if(score > best){
		best = score;
		highScore.innerHTML = "High Score: " + best;
	}
}

function first_step(){
	init();
	canvas = document.createElement("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	draw();
}

function game_over(){
	ctx.font = "48px Arial";
	ctx.fillStyle ="#000";
	ctx.fillText("GAME OVER",100,250);
	updateHighScore();	
}
 // rezolvat unde loeste jos