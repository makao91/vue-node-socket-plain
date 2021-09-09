var http = require("http");
var url = require('url');
var fs = require('fs');
var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('<h1>Hey, have you heard about our <a href="/signup.html">signup page</a></h1>');
            response.end();
            break;
        case '/signup.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                    response.end();
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
});
server.listen(8000);
const io = require('socket.io')(server);

//turn off debug
// io.set('log level', 1);
// define interactions with client
io.sockets.on('connection', function(socket){
    //send data to client
    setInterval(function(){
        socket.emit('stream', {'title': "A new title via Socket.IO!"});
    }, 1000);
    setInterval(function(){
        socket.emit('stream_second', {'title': "Second push"});
    }, 300);
});
