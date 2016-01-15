module.exports = function(req, res, next){
    console.log('unknown resource - ', req.url.pathname);
    res.statusCode = 404;
    res.end();
    next();
}
