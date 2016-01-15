var net = require("net");
var fs = require("fs");
var path = require("path");

//node server.js test.txt
//0     1         2
var fileName = process.argv[2] || '';
var file = path.join(__dirname, fileName);

if (!fileName || !fs.existsSync(file)){
    console.log("Invalid filename");
    process.exit(1);
}

var msgConnections = [];

var bugMsgServer = net.createServer(function (connection){
    connection.on('data', function(msg){
        console.log(msgConnections.length);
        var output = {
            type : "newBug",
            filename : 'another new bug is added'
        };
        msgConnections.forEach(function(c){
            c.write(JSON.stringify(output));
        });
    });
    connection.on('error', function(){
        console.log('something went wrong on server [9090]');
    })
});

bugMsgServer.listen(9090);
console.log("bugMsgServer listening on 9090")



var server = net.createServer(function(connection){
    msgConnections.push(connection);
    
    connection.on('data', function(msg){
        console.log('data from client - ', msg);
    });
    connection.on("error", function(){
        console.log("connection error");
    });
    console.log("a new connection is established");
    var output = {
        type : "watching",
        filename : file
    };
    connection.write(JSON.stringify(output));
    fs.watchFile(file, function(){
        var output = {
            type : "change",
            filename : file,
            timestamp : new Date()
        }

        var outputAsString = JSON.stringify(output);
        connection.write(outputAsString);
    });
});

server.listen(9191);
console.log("Message broker listening on port 9191");

