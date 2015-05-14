window.onload = first_step;
var WIDTH = 700, HEIGHT = 400, pi = Math.PI;
var canvas, ctx, keystate, score, best, hasLost;
var player, ai, ball;

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
}

ball = {
	x: null;
	y: null;
	side: 20;
	update: function(){};
	draw: function(){
		ctx.filRect(this.x, this.y, this.side, this.side);

	};
}

function main(){
	canvas = document.createElement("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);

	init();

	var loop = function(){
		update();
		draw();

		window.requestAnimationFrame(loop, canvas);
	};

	window.requestAnimationFrame(loop, canvas);

}
function init() {
	score = 0;
	best = -1;
	hasLost = false;
	player.y = HEIGHT-player.height;
	player.x = (WIDTH - player.width)/2;	
	star.x = Math.floor(Math.random()*(WIDTH-star.width)+1);
	star.y = 0;
}

function update(){
	player.update();
	ball.update();
}

function draw(){
	ctx.font = "20px Arial";
	ctx.fillStyle = "#22f";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.save();
	ctx.fillStyle = "#0f0";
	player.draw();
	star.draw();
	ctx.fillStyle = "#0f0";
	ctx.fillText("SCORE: " + score, 10, 32);
	ctx.fillText("LIVES: " + lives, canvas.width-85, 32);
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
