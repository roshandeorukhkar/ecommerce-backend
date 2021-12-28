const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerSchema = new mongoose.Schema(
    {
        languageId :{
            required: true,
            type:Number
        },
        firstName :{
            type : String
        },
        lastName :{
            type : String
        },
        email :{
            required: true,
            trim : true,
            unique: true,
            type : String
        },
        mobile :{
            unique: true,
            maxlength : 10,
            required: true,
            trim:true,
            type : Number
        },
        password :{
            required: true,
            type:String
        },
        salt :{
            required: true,
            type : String
        },
        ip:{
            required: true,
            type : Number
        },
        status :{
            required: true,
            type : Boolean
        },
        safe :{
            required: true,
            type: Boolean
        },
        tokan :{
            required: true,
            type:String
        },
        date_added :{
            required: true,
            type:Date
        },
        date_modified :{
            required: true,
            type :Date
        }
    }
)
module.exports = mongoose.model("Customer" ,customerSchema)