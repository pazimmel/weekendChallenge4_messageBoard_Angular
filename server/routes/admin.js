var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/message_board';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded: true}));


router.delete('/data', function (req,res){
    pg.connect(connectionString, function(err, client){
        var personID = req.body.id;
        client.query("DELETE FROM message_board WHERE id = $1", [personID], function(err, results){
           if (err) {
               console.log("Error deleting: ", err);
               res.send(false);
           }
            res.send(true);
        });
    });
});

router.get('/*', function(req,res){
    var file = req.params[0] || "/views/admin.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;