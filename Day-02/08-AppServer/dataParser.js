var url = require("url"),
    qs = require("querystring");

module.exports = function(req, res, next){
    req.field = function(attrName){
        return req.url.query[attrName] || req.body[attrName];
    };

    req.body = {};
    req.url = url.parse(req.url, true);
    if (req.method === 'POST'){
        var dataAsString = '';
        req.on('data', function(chunk){
            dataAsString += chunk;
        });
        req.on('end', function(){
            req.body =  qs.parse(dataAsString);
            next();
        })
    } else {
        next();
    }

}
