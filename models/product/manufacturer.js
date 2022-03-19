const mongoose = require("mongoose");
/* Category  adde here in schema */
const manufacturerSchema = new mongoose.Schema(
    {
        manufacturerName: {
           // unique : true ,
           // require : true,
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
        status: {
            type: Number,
            default: 1
        },
        description: {
            type: String,
        }
    },
    { timestamps: true }
    
);

module.exports = mongoose.model("Manufacturer", manufacturerSchema);
