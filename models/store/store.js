const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
    {
        storeName:{
            type : String,
        },
        ownerName :{
            type:String,
        },
        status :{
            type:Boolean ,
            default : true,
        }

    }
);



module.exports = mongoose.model("Store" ,storeSchema);

