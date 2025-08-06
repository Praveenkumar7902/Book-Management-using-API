const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema(
    {
        PID:Number,
        name:String,
        books:[String],  
    },
     {
  versionKey: false
}
);

const PublicationModel = mongoose.model("Publications",PublicationSchema);

module.exports = PublicationModel; 