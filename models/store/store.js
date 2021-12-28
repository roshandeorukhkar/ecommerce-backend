const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
    {
        storeName:{
            require : true,
            type : String
        },
        userName :{
            require : true,
            type:String
        },
        firstName :{
            type:String
        },
        lastName :{
            type:String
        },
        email :{
            require : true,
            trim : true ,
            unique : true,
            type:String
        },
        mobile :{
            unique : true,
            require : true,
            maxlength : 10 ,
            type:Number
        },
        password :{
            require : true,
            type:String
        },
        salt :{
            require : true,
            type:String
        },
        addressId :{
            require : true,
            type:Number
        },
        ip :{
            require : true,
            type:Number
        },
        status :{
            require : true,
            type:Boolean
        },
        approved :{
            require : true,
            type:Boolean
        },
        tokan :{
            require : true,
            type:String
        },
        image :{
            require : true,
            type:String
        },
        aboutUs :{
            require : true,
            type:String
        }
    }
)
module.exports = mongoose.model("Store" ,storeSchema)