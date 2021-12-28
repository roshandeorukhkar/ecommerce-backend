const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const manufacturerSchema = new mongoose.Schema(
    {
        manufacturerName :{
            unique : true ,
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
        status:{
            require : true,
            type: Boolean
        }
    }
);
module.exports = mongoose.model("Manufacturer" ,manufacturerSchema)