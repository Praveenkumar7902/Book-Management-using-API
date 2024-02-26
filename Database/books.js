const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
    {
        
        ISBN:String,
        title: String,
        pubdate: String,
        pages:Number ,
        language:String,
        author: [Number],
        publication:[Number],
        category:[String],    
    }
);

const BookModel = mongoose.model("Books",BookSchema);

module.exports = BookModel;
