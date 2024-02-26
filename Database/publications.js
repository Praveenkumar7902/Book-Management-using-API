const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema(
    {
        PID:Number,
        name:String,
        books:[String],  
    }
);

const PublicationModel = mongoose.model("Publications",PublicationSchema);

module.exports = PublicationModel; 