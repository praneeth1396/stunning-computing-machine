var pg = require('pg');
var appRouter = function(app){
  var dept;
  var course;
  var sem;
  app.get('/list-dept',function(req,res){
        pg.connect(process.env.DATABASE_URL,function(err,client,done){
                client.query('SELECT * from Department',function(err,result){
                      if(err){
                         res.write("Error !");
                         console.log("Error !");
                         res.end();
                      }
                      else{
                         var dept_list = JSON.stringify({"dept_list":result.rows});
                         res.end(dept_list);
                         console.log(dept_list);
                      }
                });
                done();
        });
  });
  app.post('/list-course',function(req,res){

    console.log(req.body['deptid']);
    dept = req.body['deptid'];

       pg.connect(process.env.DATABASE_URL,function(err,client,done){
          client.query("SELECT course_id from dept_course where dept_id = '"+dept+"'",function(err,result){
                      if(err){
                        res.write(err);
                        res.end();
                      }
                      else{
                        var courses = JSON.parse(JSON.stringify(result.rows[0]));
                        var i = 0;
                        console.log(courses['course_id'].length);

                          var id = courses['course_id'][i];
                          var array = new Array();
                          client.query("SELECT * from Course where course_id = '"+id+"'",function(err,result){
                                       if(err){
                                         res.write("Error !");
                                         console.log("Error !");
                                         res.end();
                                       }
                                       else{
                                         array.push(JSON.parse(JSON.stringify(result.rows[0])));
                                         console.log(JSON.stringify(result.rows[0]));
                                         var jsonarr = JSON.stringify({"courses":array});
                                         console.log(jsonarr);
                                         if( i == (courses['course_id'].length-1))
                                         res.end(jsonarr);
                                       }
                          });
                          i = i + 1;
                      

                      }

          });
                 done();
       });
  });
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
