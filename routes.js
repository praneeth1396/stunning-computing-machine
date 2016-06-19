var appRouter = function(app){
       app.get('/listuser',function(req,res){
                  req.on("data",function(data){

                  });
       });
}
module.exports = appRouter;

var mysql = require("mysql");
var conn = mysql.createConnection({
        host : "localhost",
        user : "root",
        password : "",
        database : "msc"
});

conn.connect(function(err){
          if(err){
              console.log("Error");
          }
          console.log("Connection established");
});
