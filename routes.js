var pg = require('pg');
var appRouter = function(app){
       app.post('/',function(req,res){
                console.log("Hey");
                res.write("Hey");
                console.log(req.body['username']);
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM softies2k14', function(err, result) {
         if (err){
            res.write("Error ! :(");
            console.log("Error ! :(");
            res.end();
          }
           else{
              while(i<result.rows.length){
                      if(result.rows[i].rollno == req.body['username']){
                                  res.write("Hey gowri");
                      }
                      else{
                          i++;
                      }
              }
              res.write("Found :)");
              console.log("Found :)");
              res.end();
           }
              done();
           });
               });
       });
}
module.exports = appRouter;
