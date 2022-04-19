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
            type:Array,
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
            type:Array,
        },
        manufactures:{
            type:String,
        },
        category: {
            type: ObjectId,
            ref: "Category",
        },
        subcategory: {
            type: String,
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
        productImg: {
            type :  Array
        },
        image: {
            type :  Array
        },
        shipping: {
            type: Boolean
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

