var pg = require('pg');
var appRouter = function(app){
       app.post('/',function(req,res){
                console.log("Hey");
                console.log(req.body['username']);

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM softies2k14', function(err, result) {
         if (err){
            res.write("Error ! :(");
            console.log("Error ! :(");
            res.end();
          }
           else{
             var i = 0;
              console.log(req.rows['rollno']);
              console.log("Found :)");
              res.end();
           }

           });
               });
       });
}
module.exports = appRouter;
