var express = require("express");
var app = express();
app.use(express.static(__dirname + '/public'));

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

console.log("Running");
var data = [];

io.on("connection", socket =>{
    if(socket.connected)
    {
        console.log(socket.id);
        var result = true;
        data.push(result, socket.id);
        socket.emit('start', data);
    }

    socket.on("user-choice-send", data =>{
        io.emit('user-choice-sendback', data);
    });    
});
