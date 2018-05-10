import io from 'socket.io-client/dist/socket.io';

//socket is the object we send to emit
const socket = io('http://10.1.1.108:9000',{ jsonp: 
false });

//on listens , the name of the methos isconnected
socket.on('connected', function(data){
    console.log(data);
});

//export so we can use it anywhere in the application
export default socket;