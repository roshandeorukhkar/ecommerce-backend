const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
           // trim: true,
           // required: true,
            //maxlength: 3
        },
        attribute:{
            type:String,
        },
        height: {
            type: String
        },
        width: {
            type: String
        },
        leanth: {
            type: String
        },
        description: {
            type: String,
          //  required: true,
            //maxlength: 2000
        },
        price: {
            type: Number,
            //trim: true,
           // required: true,
           // maxlength: 32
        },
        specification:{
            type:String,
        },
        manufactures:{
            type:String,
        },
        category: {
            type: ObjectId,
            ref: "Category",
           // required: true
        },
        quantity: {
            type: Number
        },
        sold: {
            type: Number,
            default: 0
        },
        type: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            default: 1
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        shipping: {
           // required: false,
            type: Boolean
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

