var _handlers = [];

function app(req, res){
    exec(_handlers, req, res);
}

app.use = function(handler){
    _handlers.push(handler);
}

function exec(handlers, req, res){
    var first = handlers[0],
        remaining = handlers.slice(1),
        next = function(){
            exec(remaining, req, res);
        };
    if (typeof first === 'function')
        first(req, res, next);
}

module.exports = app;
