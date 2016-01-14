/*Sync*/
function addSync(x,y){
    console.log("[Provider] processing ", x, " and ",y);
    if (!x || !y) throw new Error("Invalid arguments");
    var result = x + y;
    console.log("[Provider] returning result");
    return result;
}

function addSyncClient(x,y){
    console.log("[Consumer] triggering add");
    try {
        var result = addSync(x,y);
        console.log("[Consumer] result = ", result);
    } catch (e){
        console.log("Sorry! Something went wrong!!");
    }
}

/* Async */
function add(x,y,onResult){
    console.log("[Provider] processing ", x, " and ",y);
    setTimeout(function(){
        if (!x || !y) {
            var e =  Error("Invalid arguments");
            onResult(e);
            return;
        }
        var result = x + y;
        console.log("[Provider] returning result");
        if (typeof onResult === 'function')
            onResult(null, result);
    },3000)

}

function addClient(x,y){
    console.log("[Consumer] triggering add");
    add(x,y, function(err, result){
        if (err) {
            console.log("Sorry! Something went wrong!!");
            return;
        }
        console.log("[Consumer] result = ", result);
    });
}

module.exports.addSyncClient = addSyncClient;
module.exports.addClient = addClient;
