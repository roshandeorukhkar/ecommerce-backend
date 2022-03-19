const mongoose = require("mongoose");
const { Schema } = mongoose;
const storeUsersSchema = require("./storeUser");

const storeSchema = new mongoose.Schema(
    {
        storeName:{
            type : String,
        },
        storeId:{
            type : String
        },
        status :{
            type:Boolean ,
            default : true,
        },
        isDelete :{
            required : false,
            type : Boolean,
            default : 0,
            ref : "1 is deleted & 0 is not deleted",
        },
        createdDate :{
            type : Date,
            default : Date.now
        }
    }
);



module.exports = mongoose.model("Store" ,storeSchema);

