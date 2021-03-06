const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;
var Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        brand: {
            type: String,
        },
        attribute:{
            type: Array,
        },
        height: {
            type: String
        },
        width: {
            type: String
        },
        length: {
            type: String
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        specification:{
            type:Array
        },
        manufactures:{
            type: String,
        },
        store:{
            type: ObjectId,
            ref: "Store"
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
            type: String,
            default: 0
        },
        status: {
            type: Number,
            default: 1
        },
        images: {
            type : Schema.Types.Mixed
        },
        shipping: {
            type: String
        },
        discount: {
            type : String
        },
        deletedAt :{
            require : true,
            type : Date
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

