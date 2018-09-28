// requiring Mongoose

var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var articleSchema = new Schema({

    headline: {
        type: String, 
        required: true
    }, 
    summary: {
        type: String, 
        required: true
    }, 
    url: {
        type: String,
        required: true
    }

    // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
   
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;

