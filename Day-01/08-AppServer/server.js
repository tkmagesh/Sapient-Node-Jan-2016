var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var staticResourceExtns = ['.html','.css','.js','.jpg','.png','.ico','.json'];

function isStatic(resource){
    var ext = path.extname(resource);
    return staticResourceExtns.indexOf(ext) !== -1;
}


var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url);
    var resourceName = path.join(__dirname, urlObj.pathname);
    if (isStatic(resourceName)){
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
    } else {
        console.log('unknown resource - ', resourceName);
        res.statusCode = 404;
        res.end();
    }
});
server.listen(9090);