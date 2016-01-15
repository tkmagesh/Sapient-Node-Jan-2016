var http = require('http');
var path = require('path');
var dataParser = require('./dataParser');
var staticServer = require('./staticServer');
var calculatorReqHandler = require('./calculatorReqHandler');
var notFoundHandler = require('./notFoundHandler');
var app = require('./app');

app.use(dataParser);
app.use(staticServer(path.join(__dirname, './public')));
app.use(calculatorReqHandler);
app.use(notFoundHandler);

http.createServer(app).listen(9090);
console.log("server listening on port 9090");
