var appRouter = function(app){
       app.get('/listuser',function(req,res){
                  res.send("Hey there!");
       });
}
module.exports = appRouter;
