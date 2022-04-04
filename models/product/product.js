const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
       
        },
        brand: {
            type: String,
        },
        attribute:{
            type:String,
        },
        dimension:{
            type: Array,
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
        },
        price: {
            type: Number,
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
            contentType: Array
        },
        productImg: {
            type :  Array
        },
        shipping: {
           // required: false,
            type: Boolean
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

