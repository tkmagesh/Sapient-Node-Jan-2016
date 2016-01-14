var fs = require('fs'),
    fileName = 'sample.txt';

var fileContents = fs.readFile(fileName, {encoding : 'utf8'}, function(fileContents){
    console.log(fileContents);
    console.log('--------EOF------');
});
