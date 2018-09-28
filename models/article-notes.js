// requiring Mongoose

var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var noteSchema = new Schema({

    headlineID: {
        type: Schema.Types.ObjectId, 
        ref: "Article"
    }, 
    date: String, 
    note: String

    // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
   
});

var articleNote = mongoose.model("articleNote", noteSchema);

module.exports = articleNote;