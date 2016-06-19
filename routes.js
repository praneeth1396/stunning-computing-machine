var pg = require('pg');
var appRouter = function(app){
       app.post('/',function(req,res){
                console.log("Hey");
                res.write("Hey");
                console.log(req);
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM softies2k14', function(err, result) {

         if (err){
            res.write("hey world");
            console.log("hey world");
            res.end();
          }
           else{
              res.write(result.rows[0].rollno +" found");
              console.log("found");
              res.end();
           }
              done();
           });
               });
       });
}
module.exports = appRouter;
