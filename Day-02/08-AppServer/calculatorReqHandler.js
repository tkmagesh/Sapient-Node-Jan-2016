var calculator = require('./calculator'),
    qs = require('querystring');

module.exports = function(req, res, next){
    if (req.url.pathname === '/calculator'){
        var  n1 = parseInt(req.field("n1"), 10),
            n2 = parseInt(req.field("n2"), 10),
            op = req.field("op"),
            result = calculator[op](n1,n2);
        var viewData= {
            n1 : n1,
            n2 : n2,
            op : op,
            result : result
        };
        res.render("calculatorResponse.html", viewData);
    } else {
        next();
    }

}
