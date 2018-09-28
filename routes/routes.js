
var scrape = require("../scrapes/scrape");

var headlineController = require("../controllers/headlines");

var notesController = require("../controllers/notes");


module.exports = function(router) {

    // renders home.handlebars page
    router.get("/", function(request, response) {
        response.render("home");
    });

    // renders saved.handlebars page
    router.get("/saved", function(request, response){
        response.render("saved");
    });

    // api route to "fetch" articles

    router.get("/api/fetch", function(req, res){
        headlineController.fetch(function(err, docs){
            if (!docs || docs.insertedCount === 0){
                res.json({
                    message: "No new articles today :( Come back another time. "
                });
            }
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles"
                });;
            }
        });
    });

    // route that grabs all the headlines in the db

    router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlineController.get(query, function(data) {
            res.json(data);
        });
    });

    // route to delete specfic articles

    router.delete("/api/headlines/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        headlineController.delete(query, function(err, data){
            res. json(data);
        });
    });
    
    // route to update headlines
    router.patch("/api/headlines", function(req, res) {
        headlineController.update(req.body, function(err, data){
            res.json(data);
        });
    });

    // route that grabs notes associated with the article
    router.get("/api/notes/:headline_id?", function(req, res){
        var query = {};
        if (req.params.headline_id){
            query._id  = req.params.headline_id;
        }
        notesController.get(query, function(err, data){
            res.json(data);
        });
    });

    // route to delete notes

    router.delete("/api/notes/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data){
            res.json(data);
        });
    });

    // routes to post notes to articles
     router.post("/api/notes", function(req, res){
         notesController.save(req.body, function(data){
             res.json(data);
         });
     });

}