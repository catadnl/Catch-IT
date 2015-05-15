window.onload = first_step;

var WIDTH = 500, HEIGHT = 600, KEY_LEFT  = 100, KEY_RIGHT = 102, SPEED = 4;
var canvas, ctx, keystate, score, best, hadLost, check, dx = 1 , dy = 1, add;
var player, ball,

player = {
	x: null,
	y: null,
	width:  100,
	height: 20,
	
	update: function() {
		if (keystate[KEY_LEFT]) this.x -= 15;
		if (keystate[KEY_RIGHT]) this.x += 15;
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
		add = Math.min(Math.floor(score/3), 5);
		this.x = this.x + dx + add*dx/Math.abs(dx);
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
		this.y = this.y + dy + add*dy/Math.abs(dy);
		if (this.y > HEIGHT - 2 * player.height - 10) {
			this.y -= 2 * Math.abs(dy);
			if (dy > 0)
				dy = -dy;
			if ((this.x < player.x - this.side + 1) || this.x > (player.x + player.width + this.side - 1)){
				hadLost = true;
			}
			else {
				score = score + add + 1;
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
		if(hadLost)
			game_over();
		else
			window.requestAnimationFrame(loop, canvas);
	};
	window.requestAnimationFrame(loop, canvas);
}
function init() {
	add = 0;
	dx = SPEED * dx/Math.abs(dx);
	dy = SPEED * dy/Math.abs(dy);
	if(check.checked){
		dx = 7 * dx/Math.abs(dx);
		dy = 7 * dy/Math.abs(dy);
	}
	score = 0;
	hadLost = false;
	player.y = HEIGHT - player.height - 10;
	player.x = (WIDTH - player.width)/2;	
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
	ctx.fillText("SCORE: " + score, 200, 32);
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
	setTitle(document.getElementById("quote"));
	showPrettyMessage();
	check = document.getElementById("option");
	check.checked = false;
	best = -1;
	init();
	canvas = document.createElement("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	draw();
	ctx.fillStyle = "#FF8080";
	ball.draw();
}

function game_over(){
	ctx.fillStyle = "#FF8080";
	ball.draw();
	updateHighScore();
	ctx.font = "48px Arial";
	ctx.fillStyle ="black";
	ctx.fillText("LOOOOOser ..",100,250);	
}

function showPrettyMessage(){
	var date = new Date();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var day = days[date.getDay()];
	var exactDate = day + ", " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
	setTimeout(function(){ alert(exactDate + "\nWelcome to Catch - IT ! \n 'Hope you'll enjoy it !  ;) "); }, 3000);
	clearTimeout();
}

function setTitle(title){
	title.style.position = "absolute";
	title.style.left = "37%";
	title.style.top = "35%";
	title.style.font = "60px Arial";
	title.style.color = "black";
	setTimeout(function(){ title.parentNode.removeChild(title); }, 10000);
	clearTimeout();
}