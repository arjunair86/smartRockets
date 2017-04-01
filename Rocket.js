function Rocket(dna){

	this.pos = createVector(width/2, height-6);
	this.velocity = createVector();
	this.acceleration = createVector();
	this.reached = false;
	this.crashed = false;

	if(dna){
		this.dna = dna;
	} else {
		this.dna = [];
		this.dna = new DNA();
	}
	this.count = 0;
	this.fitness = 0;

	this.applyForce = function(force){
		this.acceleration.add(force);
	}

	this.calculateFitness = function(){
		var d = dist(this.pos.x, this.pos.y, targetPos.x, targetPos.y);
		this.fitness = map(d, 0, width, width, 0);
		if(this.reached){
			this.fitness *= 10;
		}
		if(this.crashed){
			this.fitness /= 10;
		}

	}

	this.update = function(){

		// if(this.pos.x >= width){
		// 	this.pos.x = 0;
		// }
		// if(this.pos.x <= 0){
		// 	this.pos.x = width;
		// }

		if(this.pos.x > width || this.pos.x < 0){
			this.crashed = true;
		}
		if(this.pos.y > height || this.pos.y < 0){
			this.crashed = true;
		}

		var d =dist(this.pos.x, this.pos.y, targetPos.x+25, targetPos.y);
		
		if(this.pos.x > targetPos.x && this.pos.x < targetPos.x + 25 && this.pos.y > targetPos.y && this.pos.y < targetPos.y + 25 || d < 25){
			this.reached = true;
			this.pos = targetPos.copy();
		}

		if(this.pos.x > obstaclePos.x && this.pos.x < obstaclePos.x + obstacleWidth && this.pos.y > obstaclePos.y && this.pos.y < obstaclePos.y + obstacleHeight){
			this.crashed = true;
		}


		if(!this.reached && !this.crashed){
			this.pos.add(this.velocity);
			this.velocity.add(this.acceleration);
			this.acceleration.mult(0);
		}

		this.applyForce(this.dna.genes[this.count]);
		this.count++;

	}

	this.show = function(){
		push();
		translate(this.pos.x, this.pos.y);
		fill(255, 200);
		rotate(this.velocity.heading());
		rectMode(CENTER);
		rect(0, 0, 10, 5);
		pop();
	}
}