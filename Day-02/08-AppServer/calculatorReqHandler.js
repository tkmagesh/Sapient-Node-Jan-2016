var calculator = require('./calculator'),
    qs = require('querystring');

module.exports = function(req, res, next){
    var handled = false;
    if (req.url.pathname === '/calculator' && req.method === 'GET'){
        var data = req.url.query,
            n1 = parseInt(data.n1, 10),
            n2 = parseInt(data.n2, 10),
            op = data.op;
        var result = calculator[op](n1,n2);
        res.write(result.toString());
        res.end();
        handled = true;
    } else if (req.url.pathname === '/calculator' && req.method === 'POST'){
        var dataAsString = '';
        req.on('data', function(chunk){
            dataAsString += chunk;
        });
        req.on('end', function(){
            var data = qs.parse(dataAsString),
                n1 = parseInt(data.n1, 10),
                n2 = parseInt(data.n2, 10),
                op = data.op;
            var result = calculator[op](n1,n2);
            res.write(result.toString());
            res.end();
        })
        handled = true;
    } else {
        next();
    }

}
