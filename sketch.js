var rockets;
var popmax = 50;
var lifespan = 400;
var countP;
var count = 0;
var targetPos;
var obstaclePos;
var obstacleWidth = 300;
var obstacleHeight = 25;

function setup(){
	createCanvas(600,600);
	targetPos = createVector(width/2-15, height/30);
	obstaclePos = createVector(width/2-100, height/2);
	rockets = new Population(popmax);
	countP = createP();
}

function draw(){
	background(51);
	
	rect(targetPos.x, targetPos.y, 25, 25);// target

	rect(obstaclePos.x, obstaclePos.y, obstacleWidth, obstacleHeight);//obstacle

	rockets.show();
	
	countP.html("Lifespan: "+ count);
	count++;

	if(count >= lifespan){
		rockets.calculateFitness();
		rockets.selection();
		count = 0;
	}
}