        // HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var path = require('path');

var HTTP_OK = 200,
    HTTP_ERR_UNKNOWN = 500,
    HTTP_ERR_NOT_FOUND = 404;

httpServer.listen(8080);

function requestHandler(req, res) {
    

    var filepath =  (req.url == '/' ? 'index.html' : '.' +req.url) ,
        fileext = path.extname(filepath); 

console.log("Request for " + filepath+ " received.");
    fs.exists(filepath, function (f) {

        if (f) {

            fs.readFile(filepath, function (err, content) {
                if (err) {
                    res.writeHead(HTTP_ERR_UNKNOWN);
                    console.log('????');
                    res.end();
                } else {

                    res.writeHead(HTTP_OK, contentType(fileext));
                        console.log('seems ok');
                    res.end(content);
                }
            });
        } else {
            console.log('File not found');
            res.writeHead(HTTP_ERR_NOT_FOUND);
            res.end();
        }
    });
}

function contentType(ext) {
    var ct;

    switch (ext) {
    case '.html':
        ct = 'text/html';
        break;
    case '.css':
        ct = 'text/css';
        break;
    case '.js':
        ct = 'text/javascript';
        break;
    default:
        ct = 'text/plain';
        break;
    }

    return {'Content-Type': ct};
}


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
    // We are given a websocket object in our function
    function (socket) {
    
        console.log("We have a new client: " + socket.id);
        // console.log("We have a new client: " + socket.id);
        socket.on('peer_id', function(data) {
            console.log("Received: 'peer_id' " + data);

            // We can save this in the socket object if we like
            socket.peer_id = data;
            console.log("Saved: " + socket.peer_id);

            // We can loop through these if we like
            for (var i  = 0; i < io.sockets.clients().length; i++) {
                console.log("loop: " + i + " " + io.sockets.clients()[i].peer_id);
            }
            
            // Tell everyone my peer_id
            socket.broadcast.emit('peer_id',data);
        });
        
        
        socket.on('disconnect', function() {
            console.log("Client has disconnected");
        });
    }
)