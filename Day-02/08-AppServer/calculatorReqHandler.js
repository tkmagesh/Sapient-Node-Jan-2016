var calculator = require('./calculator'),
    qs = require('querystring');

module.exports = function(req, res, next){
    if (req.url.pathname === '/calculator'){
            n1 = parseInt(req.field("n1"), 10),
            n2 = parseInt(req.field("n2"), 10),
            op = req.field("op");
        var result = calculator[op](n1,n2);
        res.write(result.toString());
        res.end();
    } else {
        next();
    }

}
