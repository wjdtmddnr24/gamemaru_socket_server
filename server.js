var app = require('http').createServer(handler)
var io = require('socket.io')(20124);
var fs = require('fs');

// app.listen(20124);

function handler() {

}

var player = {
    id: "",
    position: [0.0, 0.0, 0.0],
    rotation: [0.0, 0.0, 0.0]
};

var players = {};

io.on('connection', function (socket) {
    socket.on("USER_CONNECT", function (data) {
        console.log("user connected");
        socket.emit("USER_CONNECTED", {id: socket.id});
    });

    socket.on("sync:player", function (player) {
        // player.id = socket.id;
        players[player.id] = player;
        socket.broadcast.emit("sync:player", player);
        printPlayers();
    });

    socket.on('disconnect', function () {
        console.log('user disconnect')
        if (socket.id in players) delete players[socket.id]
        socket.broadcast.emit("sync:deletePlayer",{id: socket.id});
    });

    socket.on('my other event', function (data) {
        console.log(data);
    });
});

function printPlayers() {
    console.log(players)
}