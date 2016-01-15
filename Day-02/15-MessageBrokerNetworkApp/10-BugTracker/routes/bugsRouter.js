var express = require('express'),
    router = express.Router();

var list = [
    {id : 1, name : "Data persistence failure", isClosed : false},
    {id : 2, name : "User authentication error", isClosed : true},
    {id : 3, name : "Server communication erratic", isClosed : false}
]
router.get('/', function(req, res, next){
   res.render('bugs/index', {bugs : list});
});

router.get('/new', function(req, res, next){
    res.render('bugs/new');
});

router.post('/new', function(req, res, next){
     var newId = list.reduce(function(result, bug){
         return result > bug.id ? result : bug.id;
     },0) + 1;
     var bug = {
         id : newId,
         name : req.body.newBug,
         isClosed : false
     };
     list.push(bug);
     req.msgSocket.write('A new bug is created [' + bug.name + ']');
     res.redirect('/bugs');
});

router.get('/toggle/:id', function(req, res, next){
    var bugId = parseInt(req.params.id,10);
    var bug = list.filter(function(bug){
        return bug.id === bugId;
    })[0];
    bug.isClosed = !bug.isClosed;
    res.redirect('/bugs');
});

router.get('/api', function(req, res, next){
    res.status(200).json({bugs : list});
});
router.get('/api/:id', function(req, res, next){
    var bugId = parseInt(req.params.id,10);
    var bug = list.filter(function(b){
        return b.id === bugId;
    })[0];
    if (bug){
        res.status(200).json(bug);
    } else {
        res.status(404).end();
    }
});

router.post('/api', function(req, res, next){
    var newId = list.reduce(function(result, bug){
         return result > bug.id ? result : bug.id;
     },0) + 1;
     var bug = {
         id : newId,
         name : req.body.name,
         isClosed : req.body.isClosed || false
     };
     list.push(bug);
    res.status(201).json(bug);
});

module.exports = router;
























