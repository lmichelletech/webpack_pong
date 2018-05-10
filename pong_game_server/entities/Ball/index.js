function Ball(dimensions){
    this.size = 20;
    this.velocity = {
        x: 0,
        y: 0
    };
    this.speed = 2;
    this.position = {
        x: dimensions.width / 2 - this.size / 2,
        y: dimension.height / 2
    }
}

Ball.prototype.initialize = function(){
    var r = Math.random() - 0.5;
    var angle = Math.PI * r;

    //the velocity that the ball moves
    this.velocity = {
        x: this.speed * Math.cos(angle),
        y: this.speed * Math.sin(angle)
    }
};

Ball.prototype.update = function(Game){
    var PLAYERS = Game.PLAYERS;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //for testing we will alow the ball to bounce off both sides
    if(this.position.x + this.size >=
    Game.dimensions.width && this.velocity.x > 0){
        this.velocity.x *= -1;
        //Game.stop();
    }

    if(this.position.x <=0 && this.velocity.x < 0){
        this.velocity.x *= -1; //make the ball bounce of the edge
        //Game.stop();
    }

    if(this.position.y <= 0 || this.position.y >=
    Game.dimensions.height - this.size){
        this.velocity.y *= -1;
    }

    //make ball bounce off players
    //loop through every key of the object PLAYERS
    for(const ID in PLAYERS){
        if(this.position.x > PLAYERS[ID].position.x - this.size && this.position.x < PLAYERS[ID].position.x + PLAYERS[ID].dimensions.width)
        {
            if(this.position.y > PLAYERS[ID].position.y - this.size && this.position.y < PLAYERS[ID].position.y + PLAYERS[ID].dimensions.height){
                
                //in here it bounced against the PLAYERS[ID}
            this.velocity.x *= -1;
            this.velocity.x += PLAYERS[ID].velocity.x;
            this.velocity.y += PLAYERS[ID].velocity.y;
            
        }
    }
}
};
module.expots = Ball;