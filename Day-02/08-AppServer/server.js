var http = require('http');
var dataParser = require('./dataParser');
var staticServer = require('./staticServer');
var calculatorReqHandler = require('./calculatorReqHandler');
var notFoundHandler = require('./notFoundHandler');


var server = http.createServer(function(req, res){
    dataParser(req, res, function(){
        staticServer(req, res, function(){
            calculatorReqHandler(req, res, function(){
                notFoundHandler(req, res, function(){

                })
            })
        })
    })
});
server.listen(9090);
console.log("server listening on port 9090");
