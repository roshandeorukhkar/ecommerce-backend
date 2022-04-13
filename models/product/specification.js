const mongoose = require("mongoose");
/* Category  adde here in schema */
const specificationSchema = new mongoose.Schema(
    {
        manufacturerName: {
            require : true,
            type : String
        },
         date_added :{
            type : Date 
        },
        specification_type: {
            type:String,
            trim: true,
        },
        date_modified :{
            type : Date
        },
        deletedAt :{
            type : Date,
        },
        description: {
            type: String 
        },
        status: {
            type: Number,
            default: 1
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Specification", specificationSchema);
