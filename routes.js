var pg = require('pg');
var appRouter = function(app){
       app.get('/',function(req,res){
                console.log("Hey");
                res.send("Hey");
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM softies2k14', function(err, result) {

         if (err){
            res.send("hey world");
            console.log("hey world");
          }
           else{
              res.end(result +" found");
              console.log("found");
           }
           done();
           });
               });
       });
}
module.exports = appRouter;
