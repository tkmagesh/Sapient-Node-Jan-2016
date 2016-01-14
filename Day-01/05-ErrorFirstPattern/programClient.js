var program = require('./program');
console.log("Sync");
console.log(program.addSyncClient(100,0));
console.log("");
console.log("Async");
console.log(program.addClient(100,0));
