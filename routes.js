var pg = require('pg');
var appRouter = function(app){
       app.get('/',function(req,res){
                console.log("Hey");
                res.end("Hey");
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM softies2k14', function(err, result) {
         done();
         if (err){
            console.error(err);
          }
           else{
             console.log(result);
           }
           });
               });
       });
}
module.exports = appRouter;
