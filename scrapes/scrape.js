var cheerio = require("cheerio");

var request = require("request");

var scrape = function(cb) {

    request("http://nytimes.com", function(error, response, html){

        var $ = cheerio.load(html);

        var articles = [];

        $(".theme-summary").each(function(i, element){
            var title = $(this).children(".story-heading").text().trim();

            var summary = $(this).children(".summary").text().trim

            if(title && summary){
                var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s)/gm, " ").trim();

                var summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s)/gm, " ").trim();

                var dataToAdd = {
                    headline: titleNeat, 
                    summary: summaryNeat
                }
            };

            articles.push(dataToAdd);
        
        });
        cb(articles);
    });
};

module.exports = scrape;