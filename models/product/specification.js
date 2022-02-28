const mongoose = require("mongoose");
/* Category  adde here in schema */
const specificationSchema = new mongoose.Schema(
    {
        manufacturerName: {
            unique : true ,
            require : true,
            type : String
        },
         date_added :{
            require : true,
            type : Date 
        },
        specification_type: {
            type: String,
            trim: true,
            required: true
        },
        date_modified :{
            require : true,
            type : Date
        },
        deletedAt :{
            require : true,
            type : Date,
        },
        description: {
            type: String
            
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Specification", specificationSchema);
