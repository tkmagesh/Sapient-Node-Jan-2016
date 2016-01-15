var path = require("path");
var fs = require('fs');

var staticResourceExtns = ['.html','.css','.js','.jpg','.png','.ico','.json'];

function isStatic(resource){
    var ext = path.extname(resource);
    return staticResourceExtns.indexOf(ext) !== -1;
}

module.exports = function(req, res, next){
    var handled = false;
    var resourceName = path.join(__dirname, req.url.pathname);
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
        //req handled. hence dont call next
    }  else {
        next();
    }

};
