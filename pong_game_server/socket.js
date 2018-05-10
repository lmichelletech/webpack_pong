var Game = require('./entities/Game');

//reserved events are connection and disconnect
//after we connect, the first thing we do is emit
module.exports = function(http){

    //to emit to all users, you use io.emit
    //we initialize all listeners inside the conncetion callback
    var io = require('socket.io')(http);

    io.on('connection', function (socket){
        console.log('a user connected');

        //emitting only to the person that just connected
        socket.emit('connected', 'connection established');

        //emit to everyone
        socket.on('CHAT MESSAGE', function(data){
            io.emit('CHAT MESSAGE', data);
        });

        socket.on('PLAYER JOIN', function(name){

        //console.log('Game', Game)
        console.log('incoming player', name);

        Game.subscribe(socket, name, (Player, msg, ready) => {
            if(Player){
                socket.emit('JOINED AS PLAYER', Player);
            }
            else{
                return socket.emit('JOINED AS SPECTATOR', Game);
            }

            if(ready){
                Game.initializeBall();
                return io.emit('START GAME', Game);
            }
        });
    });

    //if we're in the backend, we listen for the front end
    socket.on('ACTION', function(action){
        console.log(action);

        if (Game.PLAYERS[socket.id]){
            switch (action.type){
                case 'MOVE':
                Game.PLAYERS[socket.id].move(action.direction, true);
                break;
                case 'STOP':
                Game.PLAYERS[socket.id].move(action.direction, false);
                break;
                default:
                console.log('NO ACTION');
                break;
            }
        }
    });

    

    socket.on('disconnect', function(){
        var removed = Game.unsubscribe(socket.id);

        if(removed && removed.player){
            if(Object.keys(Game.PLAYERS).length){
                Game.stop();
            }
            else{
                Game.reset();
            }
            console.log('disconnected', removed.user.name);
            return io.emit('END GAME', Game);
        }

        else if(removed && !removed.player){
            console.log('disconnected user', removed.user.name);
            return io.emit('SPECTATOR LEFT', Game);
        }
        else{
            console.log('user disconnected');
        }
    });
});
}