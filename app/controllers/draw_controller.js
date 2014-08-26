load('application');

action(function index() {
    
    draw_app.init();
    
    render({
        title: "draw#index"
    });
});

var draw_app = {
    init: function(){
        // FIX: Socket.IO’s `listen()` method expects an `http.Server` instance as its first parameter. Are you migrating from Express 2.x to 3.x?
        // http://codehenge.net/blog/2012/08/using-socket-io-with-express-3-x/
        //var http = require('http');
        //var server = http.createServer(app);

        // Including libraries
        var io = require('socket.io').listen(app);
        
        // Delete this row if you want to see debug messages
        io.set('log level', 3);
        
        // Listen for incoming connections from clients
        io.sockets.on('connection', function (socket) {

            // Start listening for mouse move events
            socket.on('mousemove', function (data) {
                
                // This line sends the event (broadcasts it)
                // to everyone except the originating client.
                socket.broadcast.emit('moving', data);
            });
        });
    }
}