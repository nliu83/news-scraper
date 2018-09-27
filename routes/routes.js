

module.exports = function(router) {

    // renders home.handlebars page
    router.get("/", function(request, response) {
        response.render("home");
    });

    // renders saved.handlebars page
    router.get("/saved", function(request, response){
        response.render("saved");
    });
}