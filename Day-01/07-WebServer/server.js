var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res){
    var resourceName = path.join(__dirname, req.url);
    console.log(resourceName, ' - ', fs.existsSync(resourceName));
    if (!fs.existsSync(resourceName)){
        res.statusCode = 404;
        res.end();
        return;
    }
    var stream = fs.createReadStream(resourceName);
    stream.on('data', function(contents){
        res.write(contents);
    });
    stream.on('end', function(){
        res.end();
    });
});
server.listen(9090);
