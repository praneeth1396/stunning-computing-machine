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
          client.query("SELECT course_id,course_name from course where dept_id = '"+dept+"'",function(err,result){
                      if(err){
                        res.write(err);
                        res.end();
                      }
                      else{
                        console.log(result.rows);
                        res.end(JSON.stringify({"course_list":result.rows}));
                      }
          });
                 done();
       });
  });

  app.post('/signup',function(req,res){
      console.log(req.body);
      var name = req.body['stud_name'];
      var rollno = req.body['stud_rollno'];
      var passwd = req.body['stud_passwd'];
      var course = req.body['stud_course'];
      var dept = req.body['stud_dept'];
      var sem = req.body['stud_sem'];

      pg.connect(process.env.DATABASE_URL,function(err,client,done){
           client.query('INSERT INTO student_details values('+rollno+','+sem+','+passwd+','+course+','+dept+','+sem+')',function(err,result){
                       if(err){
                         console.log("error!");
                         res.end("error!");
                       }
                       else{
                         res.end(JSON.stringify({"status":200}));
                       }
           });
      });

  });
  app.post('/login',function(req,res){
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
