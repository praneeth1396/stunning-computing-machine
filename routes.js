var appRouter = function(app){
       app.get('/',function(req,res){
                  res.send("Hey there!");
       });
}
module.exports = appRouter;
