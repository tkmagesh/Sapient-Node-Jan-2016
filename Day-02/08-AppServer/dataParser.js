var url = require("url");
module.exports = function(req, res, next){
    req.url = url.parse(req.url, true);
    next();
}
