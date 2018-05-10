function Spectator(socket, name){
    this.id = socket.id;
    this.name = name;
}

module.expots = Spectator;