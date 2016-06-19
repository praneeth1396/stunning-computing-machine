var appRouter = function(app){
       app.get('/',function(req,res){
                console.log("Hey");
                res.end("Hey");
       });
}
module.exports = appRouter;
