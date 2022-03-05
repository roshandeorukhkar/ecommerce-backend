const mongoose = require("mongoose");
const { Schema } = mongoose;
const storeUsersSchema = require("./storeUser");

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
        },
        userId :{
            type:  Schema.Types.ObjectId,
            ref: "user"
        },
        mobile :{
            type:String ,
        },
        address :{
            type:String,
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

