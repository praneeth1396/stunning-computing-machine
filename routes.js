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
              while(i<result.rows.length){
                      if(result.rows[i].rollno == req.body['username'] && result.rows[i].password == req.body['password']){
                                  res.end(JSON.stringify({"name":result.rows[i].name,"status":"100"}));
                                  console.log(JSON.stringify({"name":result.rows[i].name,"status":"100"}));
                                  i++;
                      }
                      else if(result.rows[i].password != req.body['password']){
                                  res.end(JSON.stringify({"name":result.rows[i].name,"status":"50"}));
                                  console.log(JSON.stringify({"name":result.rows[i].name,"status":"50"}));
                                  i++;
                      }
                      else{
                                  res.end(JSON.stringify({"name":result.rows[i].name,"status":"0"}));
                                  console.log(JSON.stringify({"name":result.rows[i].name,"status":"0"}));
                                  i++;
                      }
              }

              console.log("Found :)");

           }

           });
               });
       });
}
module.exports = appRouter;
