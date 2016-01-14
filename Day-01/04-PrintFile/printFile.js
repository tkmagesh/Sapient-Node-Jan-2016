var fs = require('fs'),
    fileName = 'sample.txt';

/*
var fileContents = fs.readFile(fileName, {encoding : 'utf8'}, function(err, fileContents){
    if (err){
        console.log(err);
        return;
    }
    console.log(fileContents);
    console.log('--------EOF------');
});
*/

var readCount = 0;
var stream = fs.createReadStream(fileName, {encoding : 'utf8'});
stream.on('data', function(chunk){
    readCount++;
    console.log(chunk);
});
stream.on('end', function(){
    console.log('--------EOF------ with readCount = ', readCount);
});
