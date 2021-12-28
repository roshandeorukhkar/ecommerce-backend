const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productImageSchema = new mongoose.Schema(
    {
        productId :{
            required : true ,
            type : Number
        },
        image :{
            required : true ,
            type: String
        },
        sort_order:{
            required : true ,
            type:String
        },
        date_added :{
            required : true ,
            type:Date
        },
        date_modified :{
            required : true ,
            type:Date
        }
    }
);
module.exports = mongoose.model("ProductImage" ,productImageSchema)