var pg = require('pg');
var appRouter = function(app){
       app.post('/',function(req,res){
                console.log(req.body);
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM softies2k14', function(err, result) {
         if (err){
            res.write("Error ! :(");
            console.log("Error ! :(");
            res.end();
          }
           else{
             var i = 0;
             var json = 0;
             while(i<result.rows.length){
               if(req.body['username']==result.rows[i].rollno){
                  if(req.body['password']==result.rows[i].password){
                        json = JSON.stringify({"name":result.rows[i].name,"status":"100"});
                        i++;
                        break;
                  }
                  else{
                       json = JSON.stringify({"status":"50"});
                       break;
                       i++;
                  }
               }
               else{
                    json = JSON.stringify({"status":"0"});
                    i++;
               }
             }
             res.end(json);
             done();
           }

           });
               });
       });
}
module.exports = appRouter;
