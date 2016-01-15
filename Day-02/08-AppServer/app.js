var _handlers = [];
var path = require("path"),
    fs = require("fs");
var handlebars = require("handlebars");

function app(req, res){
    res.render = getRender(res);
    exec(_handlers, req, res);
}

function getRender(res){
    var _response = res;
    return function render(templateName, obj){
        var templatePath = path.join(__dirname, './templates', templateName);
        fs.readFile(templatePath, {encoding : 'utf8'}, function(err, template){
            if (err){
                console.log(err);
                res.end();
            }
            console.log(template);
            var templateFn = handlebars.compile(template);
            var responseData = templateFn(obj);
            res.write(responseData);
            res.end();
        })
    }

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
