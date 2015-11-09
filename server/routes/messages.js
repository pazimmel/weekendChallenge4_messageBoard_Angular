var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL +"?ssl=true" || 'postgres://localhost:5432/message_board';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded: true}));

//post new message to database
router.post('/', function(req, res){
   var message = {
       "title" : req.body.messageTitle,
       "message" : req.body.messageText,
       "name": req.body.messageWriter
   };
    console.log(req.body);
    pg.connect(connectionString, function(err, client, done){
        var query = client.query("INSERT INTO message_board (title, message, name) values ($1,$2,$3) RETURNING id",
        [message.title, message.message, message.name],
        function (err,result) {
            if (err) {
                console.log("Error inserting data ", err);
                res.send(false);
            } else {
                res.send(true);
            }
        });

    });

});

//get all messages from database
router.get('/', function(req,res){
    var results = [];
    pg.connect(connectionString, function(err,client, done){
        var query = client.query("SELECT id, title, message, name FROM message_board ORDER BY id DESC");

        query.on('row', function(row){
            results.push(row);
        });
        query.on('end', function(){
            client.end();
            return res.json(results);
        });
        if (err) console.log("Error:", err);
    });

});

module.exports = router;
