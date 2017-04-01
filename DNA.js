var lifespan = 400;

function DNA(genes){
	if(genes){
		this.genes = genes;
	} else {
		this.genes = [];
		for(var i = 0; i < lifespan; i++){
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(0.2); ////make the force weaker
		}
	}

	this.crossover = function(parent){
		var newgenes = [];
		var mid = floor(random(lifespan));
		for(var i = 0; i < lifespan; i++){
			if(i > mid){
				newgenes[i] = this.genes[i];
			} else { 
				newgenes[i] = parent.genes[i];
			}
		}
		return new DNA(newgenes);
	}

	this.mutation = function(){
		for(var i = 0; i < lifespan; i++){
			if(random(1) < 0.01){
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(0.1);
			}
		}
	}
}