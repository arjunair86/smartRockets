function Population(popmax){
	this.rockets = [];
	this.matingPool;

	for(var i = 0; i < popmax; i++){
		this.rockets[i] = new Rocket();
	}

	this.calculateFitness = function(){
		var maxFitness = 0;
		for(var i = 0; i < popmax; i++){
			this.rockets[i].calculateFitness();
			if(this.rockets[i].fitness > maxFitness){
				maxFitness = this.rockets[i].fitness;
			}
		}

		for(var i = 0; i < popmax; i++){
			this.rockets[i].fitness /= maxFitness;
		}

		this.matingPool = [];
		for(var i = 0; i < popmax; i++){
			var n = this.rockets[i].fitness*100;
			for(var j = 0; j < n; j++){
				this.matingPool.push(this.rockets[i]);
			}
		}
	}

	this.selection = function(){
		var newRockets = [];
		for(var i = 0 ; i < popmax; i++){
			var parentA = random(this.matingPool).dna;
			var parentB = random(this.matingPool).dna;
			var child = parentA.crossover(parentB); 
			child.mutation();
			newRockets[i] = new Rocket(child);
		}
		this.rockets = newRockets;
	}


	this.show = function(){
		for(var i = 0; i < popmax; i++){
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}
}