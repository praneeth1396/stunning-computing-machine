var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));



var server = app.listen(3000,function(){
        console.log("Server listening on "+server.address().port);
});
