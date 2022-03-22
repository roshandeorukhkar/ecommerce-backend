const mongoose = require("mongoose");
/* Attribute   adde here in schema  ../Mangesh/..*/
const attributeSchema = new mongoose.Schema(
    {
        attributeName: {
            unique : true,
            require : true,
            type : String
        },
         date_added :{
            require : true,
            type : Date 
        },
        date_modified :{
            require : true,
            type : Date
        },
        deletedAt :{
            require : true,
            type : Date
        },
        description: {
            type: String,
        },
        dimension:{
         type: Array,
        },
        status: {
            type: Number,
            default: 1
        }

    },
    { timestamps: true }
    
);


module.exports = mongoose.model("Attribute", attributeSchema);
