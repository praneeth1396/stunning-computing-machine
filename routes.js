var pg = require('pg');
var appRouter = function(app){
       app.get('/',function(req,res){
                console.log("Hey");
                res.send("Hey");
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM softies2k14', function(err, result) {
         done();
         if (err){
            res.send("hey world");
          }
           else{
              res.end(result +" found");
           }
           });
               });
       });
}
module.exports = appRouter;
