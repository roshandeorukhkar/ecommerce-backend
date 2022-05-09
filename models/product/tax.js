const mongoose = require("mongoose");
/* Attribute   adde here in schema  ../Mangesh/..*/
const taxSchema = new mongoose.Schema(
    {
        taxName: {
            unique : true,
            require : true,
            type : String
        },
        taxValue: {
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
        taxDescription: {
            type: String,
        },
        status: {
            type: Number,
            default: 1
        }
    },
    { timestamps: true }    
);

module.exports = mongoose.model("Tax", taxSchema);
